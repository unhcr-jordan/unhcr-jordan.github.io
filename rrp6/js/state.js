//////////////////////////////////////////////////////////////////////////////
// state serialization

function fresh_vis_state()
{
    var lst = _.map(["WAR", "HR", "H", "W", "SO", "BA"],
          function(i) { return stats.indexOf(i); });
    lst.unshift(-1); // this jquery serialization sucks. If list is empty, we get no entry under the given key.

    return { 
        shown_histograms: lst
    };
}

var vis_state = fresh_vis_state();

function state_url()
{
    return location.origin + location.pathname + 
        "#state=" + $.param({ state: vis_state });
}

function save_vis_state(replace)
{
    if (replace)
        history.replaceState(vis_state, "Query", state_url());
    else
        history.pushState(vis_state, "Query", state_url());
}

function vis_state_updater(brush, query_key_accessor, brush_state_accessor) {
    return function() {
        var query_key = query_key_accessor();
        if (brush.empty()) {
            delete vis_state[query_key];
        } else {
            vis_state[query_key] = brush_state_accessor();
        }
        history.replaceState(vis_state, "Query", state_url());
    };
}


//////////////////////////////////////////////////////////////////////////////

function replace_queries()
{
    _.each(dimensions, function(dim) {
        dim.filterAll();
    });
    dimension_filter_map.induction_method(0);
    dimension_filter_map.position(0);

    _.each(vis_state, function(v, k) {
        if (k in dimension_filter_map)
            dimension_filter_map[k](v);
    });
}

function update_brushes()
{
    _.each(charts, function(chart) {
        var v = vis_state[chart.query_key()];
        chart.brush().clear();
        if (!_.isUndefined(v)) {
            chart.brush().extent(v);
        }
        chart.refresh_brush();
    });

    // trajectory brush
    if (vis_state.last_appearance) {
        trajectory_brush.extent([[vis_state.last_appearance[0], vis_state.last_vote[0]],
                                 [vis_state.last_appearance[1], vis_state.last_vote[1]]]);
    } else {
        trajectory_brush.clear();
    }
    refresh_trajectory_brush();

    // induction method brushes
    redraw_induction_legend_query();
    redraw_position_legend_query();
}

function sync_to_vis_state() {
    replace_queries();
    update_brushes();
    for (var i=0; i<27; ++i) {
        window.hide(i, true);
    }
    for (var k in vis_state.shown_histograms) {
        window.show(vis_state.shown_histograms[k], true);
    }
    renderAll();
}

    //////////////////////////////////////////////////////////////////////////

    var brush = d3.svg.brush();
    brush.x(x);
    brush.y(y);
    trajectory_brush = brush;
    var gBrush = box0.append("g").attr("class", "brush").call(brush);
    refresh_trajectory_brush = function() {
        gBrush.call(brush);
    };

    brush.on("brush", function() {
        if (brush.empty()) {
            last_appearance_dimension.filterAll();
            last_vote_dimension.filterAll();
            delete vis_state.last_appearance;
            delete vis_state.last_vote;
        } else {
            var extent = brush.extent();
            last_appearance_dimension.filterRange([extent[0][0], extent[1][0]]);
            last_vote_dimension.filterRange([extent[0][1], extent[1][1]]);
            vis_state.last_appearance = [extent[0][0], extent[1][0]];
            vis_state.last_vote = [extent[0][1], extent[1][1]];
        }
        renderAll();
        history.replaceState(vis_state, "Query", state_url());
    });

    brush.on("brushstart", function() {
        if (brush.empty()) {
            delete vis_state.last_appearance;
            delete vis_state.last_vote;
        } else {
            var extent = brush.extent();
            vis_state.last_appearance = [extent[0][0], extent[1][0]];
            vis_state.last_vote = [extent[0][1], extent[1][1]];
        }
        save_vis_state();
    });
    
    
    window.clear_query = function() {
        save_vis_state();
        var old_histogram = vis_state.shown_histograms;
        vis_state = fresh_vis_state();
        vis_state.shown_histograms = old_histogram;
        sync_to_vis_state();
        save_vis_state(true);
    };

    window.show_default_stats = function() {
        save_vis_state();
        var lst = _.map(["WAR", "HR", "H", "W", "SO", "BA"],
                        function(i) { return stats.indexOf(i); });
        lst.unshift(-1);
        vis_state.shown_histograms = lst;
        sync_to_vis_state();
        save_vis_state(true);
    };

    window.show_common_stats = function() {
        save_vis_state();
        vis_state.shown_histograms = [-1, 0, 1, 2, 3, 22, 23, 24, 26, 28];
        sync_to_vis_state();
        save_vis_state(true);
    };

    window.show_pitcher_stats = function() {
        save_vis_state();
        vis_state.shown_histograms = [-1, 4, 5, 6, 7, 8, 9, 10, 11];
        sync_to_vis_state();
        save_vis_state(true);
    };

    window.show_batter_stats = function() {
        save_vis_state();
        vis_state.shown_histograms = [-1, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
        sync_to_vis_state();
        save_vis_state(true);
    };

    window.filter = function(filters) {
        filters.forEach(function(d, i) { charts[i].filter(d); });
        renderAll();
    };

    window.reset = function(i) {
        charts[i].filter(null);
        renderAll();
    };

    window.hide = function(i, mask_vis_state) {
        if (!mask_vis_state)
            window.reset(i);
        var chart = charts[i];
        if (_.isUndefined(chart))
            return;
        var stat = chart.query_key();
        if (!mask_vis_state) {
            vis_state.shown_histograms = vis_state.shown_histograms.filter(function(d) { return d !== i; });
            save_vis_state();
        }
        d3.select(document.getElementById(stat + "-chart")).style("display", "none");
        d3.select(document.getElementById(stat + "-show")).style("display", null);
        
    };

    window.show = function(i, mask_vis_state) {
        var chart = charts[i];
        if (_.isUndefined(chart))
            return;
        var stat = chart.query_key();
        if (!mask_vis_state && vis_state.shown_histograms.indexOf(i) === -1) {
            vis_state.shown_histograms.push(i);
            save_vis_state();
        }
        d3.select(document.getElementById(stat + "-chart")).style("display", null);
        d3.select(document.getElementById(stat + "-show")).style("display", "none");
    };

    var stat_type_color = ["#000000",
                           "#008080",
                           "#0080FF"];
    var stat_types = [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0];

    var bounds = {
        "ERA": { min: 1.5, max: 5 },
        "SO": { min: 0, max: 3700 },
        "H": { min: 0, max: 3700 },
        "SB": { min: 0, max: 800 },
        "IP": { min: 0, max: 5500 },
        "WHIP": { min: 0.85, max: 1.75 },
        "WAR": { min: 0, max: 125 },
        "BA": { min: 0.200, max: 0.350 },
        "W": { min: 0, max: 400 },
        "OBP": { min: 0.25, max: 0.50 },
        "AB": { min: 0, max: 12000 },
        "BB.1": { min: 0, max: 2000 },
        "R": { min: 0, max: 2000 },
        "SV": { min: 0, max: 370 },
        "BB": { min: 0, max: 1900 },
        "H.1": { min: 0, max: 5000 },
        "Num.Years.On.Ballot": {min: 0, max: 18}
    };
    

$(function() {
    $("#show").css("width", window.innerWidth * 0.70);

     d3.csv("player_data.csv", function(error, player_csv) {
         d3.csv("election_data.csv", function(error, election_csv) {
    //d3.csv("http://s3.amazonaws.com/cscheid-mlb-hall-of-fame-voting/player_data.csv", function(error, player_csv) {
        //d3.csv("http://s3.amazonaws.com/cscheid-mlb-hall-of-fame-voting/election_data.csv", function(error, election_csv) {
            var obj = create_players(player_csv, election_csv);

            create_vis(obj, player_csv, election_csv);

            window.addEventListener("popstate", function(e) {
                vis_state = e.state || $.deparam(location.hash.substr(7), true).state || 
                    fresh_vis_state();
                sync_to_vis_state();
            });

            // _.each([0, 1, 4, 8, 12, 18, 21, 22, 23, 24, 25, 26], function(i) {
            //     window.hide(i);
            // });

            if (location.hash.length > 7) {
                vis_state = $.deparam(location.hash.substr(7), true).state;
            }
            sync_to_vis_state();
            save_vis_state(true);
        });
    });
});
