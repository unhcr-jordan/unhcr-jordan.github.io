 /* This function map the indicator into it's relevant dashboard style */

//National level dashboard styles (possible combinations)
//Prefix: N
//Disaggregation
//A: (Population, Gender, Age)
//B: (Population, Gender)
//C: (Population, Age) // But there may not be anything like this because when we have age we usually should have gender as well
//D: (Population)
//E: (None) //For other type of indicators than the population

//Geo-level (The idea is to have only the governorate level map)
//1: (No Map) //If the indicator is at the country level
//2: (Map) //If the indicator is reported at the governorate level and below
//------------------------------------

//Governorate level dashboard styles (possible combinations)
//Prefix: N
//Disaggregation
//A: (Population, Gender, Age)
//B: (Population, Gender)
//C: (Population, Age) // But there may not be anything like this because when we have age we usually should have gender as well
//D: (Population)
//E: (None) //For other type of indicators than the population

//Geo-level (The idea is to have only the governorate level map)
//0: (No field level dashboard) //If the indicator is reported at the country level
//1: (No Map) //If the indicator is reported at the governorate level
//2: (Map) //If the indicator is reported at the caza level (Caza level map only)
//3: (Map) //If the indicator is reported at the cadastral or site level (Caza level map and Cadastral level map)
//------------------------------------
 
 
var ind2national = {
	'# HH receiving multi-sector/ purpose cash transfers':'NA2',
	'# HH receiving newcomer cash':'NA2',
	'# HH receiving seasonal cash grants':'NA2',
	'# HH receiving voucher for fuel':'NA2',
	'# of blankets distributed':'NA2',
	'# of children who received winter clothes (in kind)':'NA2',
	'# of children who received winter vouchers':'NA2',
	'# of HH assisted with in kind CRI':'NA2',
	'# of stoves distributed':'NA2',
	'Total USD amount distributed (Fuel vouchers)':'NE2',
	'Total USD amount distributed (Multi - purpose cash )':'NE2',
	'Total USD amount distributed (Seasonal Cash Grants)':'NE2',
	'Total USD amount distributed in vouchers/cash (Newcomers)':'NE2'
	}
	
var ind2field = {
	'# HH receiving multi-sector/ purpose cash transfers':'FA2',
	'# HH receiving newcomer cash':'FA3',
	'# HH receiving seasonal cash grants':'FA3',
	'# HH receiving voucher for fuel':'FA3',
	'# of blankets distributed':'FA3',
	'# of children who received winter clothes (in kind)':'FA3',
	'# of children who received winter vouchers':'FA3',
	'# of HH assisted with in kind CRI':'FA3',
	'# of stoves distributed':'FA3',
	'Total USD amount distributed (Fuel vouchers)':'FE3',
	'Total USD amount distributed (Multi - purpose cash )':'FE2',
	'Total USD amount distributed (Seasonal Cash Grants)':'FE3',
	'Total USD amount distributed in vouchers/cash (Newcomers)':'FE3'
}

var ind2unit = {
	'# HH receiving multi-sector/ purpose cash transfers':'Household',
	'# HH receiving newcomer cash':'Household',
	'# HH receiving seasonal cash grants':'Household',
	'# HH receiving voucher for fuel':'Household',
	'# of blankets distributed':'Blankets',
	'# of children who received winter clothes (in kind)':'Children',
	'# of children who received winter vouchers':'Children',
	'# of HH assisted with in kind CRI':'Household',
	'# of stoves distributed':'Stoves',
	'Total USD amount distributed (Fuel vouchers)':'USD',
	'Total USD amount distributed (Multi - purpose cash )':'USD',
	'Total USD amount distributed (Seasonal Cash Grants)':'USD',
	'Total USD amount distributed in vouchers/cash (Newcomers)':'USD'
}

var ind2target= {
	'# HH receiving multi-sector/ purpose cash transfers':'93595',
	'# HH receiving newcomer cash':'5993',
	'# HH receiving seasonal cash grants':'88486',
	'# HH receiving voucher for fuel':'17420',
	'# of blankets distributed':'232645',
	'# of children who received winter clothes (in kind)':'0',
	'# of children who received winter vouchers':'0',
	'# of HH assisted with in kind CRI':'0',
	'# of stoves distributed':'10800',
	'Total USD amount distributed (Fuel vouchers)':'397220',
	'Total USD amount distributed (Multi - purpose cash )':'143199432',
	'Total USD amount distributed (Seasonal Cash Grants)':'23914825',
	'Total USD amount distributed in vouchers/cash (Newcomers)':'78300'
}