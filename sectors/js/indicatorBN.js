
function changeContent(){
	document.getElementById('indicatordropdown').value ="All";
	document.getElementById('areadropdown').value ="All";
	document.getElementById('fundedbydropdown').value ="All";
	document.getElementById('appealdropdown').value ="All";	
	document.getElementById('genderdropdown').value ="All";
}		  
		  
			{
var val = 'All';
$('#indicatordropdown').val(val);
			}
  d3.csv("dataind.csv", function(error, data) {
  

var dropDownInd = d3.select("#indicatordrop").append("select")
                    .attr("id", "indicatordropdown")
					.attr("style","width:400px")
					.attr("onChange","change('Ind')");


var sortind = (d3.map(data, function(d){return d.Indicator;}).keys()).sort(d3.ascending);					
var optionsInd = dropDownInd.selectAll("option")
//			.data(d3.map(data, function(d){return d.Indicator;}).keys())
			.data(sortind)
			.enter()
			.append("option");
			
optionsInd.text(function (d) { return d; })
			.attr("value", function (d) { return d; });

dropDownInd.property("value", "All");


			

var dropDownaop = d3.select("#areadrop").append("select")
                    .attr("id", "areadropdown")
					.attr("style","width:200px")
					.attr("onChange","change('Aop')");	
var sortaop = (d3.map(data, function(d){return d.Governorate;}).keys()).sort(d3.ascending);						
var optionsaop = dropDownaop.selectAll("option")
//			.data(d3.map(data, function(d){return d.Governorate;}).keys())
			.data(sortaop)
			.enter()
			.append("option");
optionsaop.text(function (d) { return d; })
       .attr("value", function (d) { return d; });
dropDownaop.property("value", "All");	   
	   
var dropDownfb = d3.select("#fundeddrop").append("select")
                    .attr("id", "fundedbydropdown")
					.attr("style","width:200px")
					.attr("onChange","change('Fb')");	
var sortfb = (d3.map(data, function(d){return d.Fundedby;}).keys()).sort(d3.ascending);						
var optionsfb = dropDownfb.selectAll("option")
//			.data(d3.map(data, function(d){return d.Fundedby;}).keys())
			.data(sortfb)
			.enter()
			.append("option");
optionsfb.text(function (d) { return d; })
       .attr("value", function (d) { return d; });
dropDownfb.property("value", "All");	   

	   
var dropDownapp = d3.select("#appealdrop").append("select")
                    .attr("id", "appealdropdown")
					.attr("style","width:200px")
					.attr("onChange","change('App')");	

var sortapp = (d3.map(data, function(d){return d.appeal;}).keys()).sort(d3.ascending);											
var optionsapp = dropDownapp.selectAll("option")
//			.data(d3.map(data, function(d){return d.appeal;}).keys())
			.data(sortapp)
			.enter()
			.append("option");
optionsapp.text(function (d) { return d; })
       .attr("value", function (d) { return d; });
dropDownapp.property("value", "All");	   
	   
var dropDowngen = d3.select("#genderdrop").append("select")
                    .attr("id", "genderdropdown")
					.attr("style","width:150px")
					.attr("onChange","change('Gen')");
					

var dropDownast = d3.select("#assisteddrop").append("select")
                    .attr("id", "assisteddropdown")
					.attr("style","width:200px")
					.attr("onChange","change('Ast')");	
var sortast = (d3.map(data, function(d){return d.Units;}).keys()).sort(d3.ascending);						
var optionsast = dropDownast.selectAll("option")
//			.data(d3.map(data, function(d){return d.Governorate;}).keys())
			.data(sortast)
			.enter()
			.append("option");
optionsast.text(function (d) {if (d == "# of benef") {return "Assistance Instance"; } else if (d == "# of case"){return "Assisted Households";} else {return d;} })
       .attr("value", function (d) { return d; });
dropDownast.property("value", "All");	   

					

var sortgen = (d3.map(data, function(d){return d.Gender;}).keys()).sort(d3.ascending);											
var optionsgen = dropDowngen.selectAll("option")
			//.data(d3.map(data, function(d){return d.Gender;}).keys())
			.data(sortgen)
			.enter()
			.append("option");
optionsgen.text(function (d) { return d; })
       .attr("value", function (d) { return d; });	   
dropDowngen.property("value", "All");	   
	   
  });
  

  function change(nm) {
    if (nm == "Ind")
	{
	
	
		   
					   
			var sel = document.getElementById('indicatordropdown');
			var sel1 = document.getElementById('assisteddropdown');
			
			if (sel.options[sel.selectedIndex].value =="All")
			{
							indicator_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	

						if (sel1.options[sel1.selectedIndex].value =="# of benef")

							{ $(".assistText").html("# of assistance instance");}
							
						else if (sel1.options[sel1.selectedIndex].value =="All")
						{ $(".assistText").html("# of HHs assisted/ assistance instance");}
						
						else
							{ 
							$(".assistText").html("# of HHs assisted");
							//document.getElementById('assistText').innerHTML = '# of HHs assisted'; 
							}
										
							

								
			}
			else if ((sel.options[sel.selectedIndex].value !=="All") && (sel1.options[sel1.selectedIndex].value !=="All"))
			{
			
							$(indicator_chart).empty();
							indicator_chart.filterAll();
							indicator_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
							
							
						if (sel1.options[sel1.selectedIndex].value =="# of benef")

							{ $(".assistText").html("# of assistance instance");}
						else
							{ 
							$(".assistText").html("# of HHs assisted");
							//document.getElementById('assistText').innerHTML = '# of HHs assisted'; 
							}			
			
			}
			else{
			
					if ((sel.options[sel.selectedIndex].value =="# of FHH assisted") || (sel.options[sel.selectedIndex].value =="# of MHH assisted") || (sel.options[sel.selectedIndex].value =="# of FHH receiving seasonal assistance") || (sel.options[sel.selectedIndex].value =="# of MHH receiving seasonal assistance"))
					{$(".assistText").html("# of HHs assisted");}
					else
					{ $(".assistText").html("# of assistance instance");}
			
							$(indicator_chart).empty();
							indicator_chart.filterAll();
							indicator_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
	}		
	if (nm == "Gen")
	{
			var sel = document.getElementById('genderdropdown');
			
			if (sel.options[sel.selectedIndex].value =="All")
			{
							gender_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	
			}
			else{
							gender_chart.filterAll();
							gender_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
	}
	
	if (nm == "App")
	{
			var sel = document.getElementById('appealdropdown');
			
			if (sel.options[sel.selectedIndex].value =="All")
			{
							appeal_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	
			}
			else{
							appeal_chart.filterAll();
							appeal_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
	}	
	
	if (nm == "Aop")
	{
			var sel = document.getElementById('areadropdown');
			
			if (sel.options[sel.selectedIndex].value =="All")
			{
							region_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	
			}
			else{
							region_chart.filterAll();
							region_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
	}	

	
	if (nm == "Ast")
	{
			var sel = document.getElementById('assisteddropdown');
			var sel1 = document.getElementById('indicatordropdown');
			//alert (sel.options[sel.selectedIndex].value);

			if ((sel.options[sel.selectedIndex].value =="All") && ((sel1.options[sel1.selectedIndex].value =="# of FHH assisted") || (sel1.options[sel1.selectedIndex].value =="# of MHH assisted") || (sel1.options[sel1.selectedIndex].value =="# of FHH receiving seasonal assistance") || (sel1.options[sel1.selectedIndex].value =="# of MHH receiving seasonal assistance")))

			{
							assist_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();			
							$(".assistText").html("# of HHs assisted");
			
			}

			
			else if (sel.options[sel.selectedIndex].value =="All")
			{
							assist_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	
							//document.getElementById('assistText').innerHTML = '# of HHs assisted/ assistance instance';		
							$(".assistText").html("# of HHs assisted/ assistance instance");
			}
			
			
			else{
					
						if (sel.options[sel.selectedIndex].value =="# of benef")

							{ $(".assistText").html("# of assistance instance");}
						else
							{ 
							$(".assistText").html("# of HHs assisted");
							//document.getElementById('assistText').innerHTML = '# of HHs assisted'; 
							}
			
							assist_chart.filterAll();
							assist_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
			
			
	}

	
	if (nm == "Fb")
	{
			var sel = document.getElementById('fundedbydropdown');
			
			if (sel.options[sel.selectedIndex].value =="All")
			{
							funded_chart.filterAll();
							dc.redrawAll();					
							dc.renderAll();	
			}
			else{
							funded_chart.filterAll();
							funded_chart.filter(sel.options[sel.selectedIndex].value);
							dc.redrawAll();					
							dc.renderAll();
			}
	}	
}