var tableModule = (function(window, $) {

    var TABLE_CONFIG = {
        ajax: {
            url: "empty.json",
            dataSrc: ""
        },
        dom: '<"table-buttons"<"table-buttons"Bf>l>t<"table-buttons"ip>',
        oLanguage: {
            sSearch: "Search my results:"
        },
        buttons: [{ extend: 'colvis', text: 'Select Columns'}],
        fixedHeader: {
            header: true,
            footer: true
        },
        columns: [{
            data: "incidntnum",
            title: "Incident#",
            name: "incidntnum",
        }, {
            data: "date",
            title: "Date",
            name: "date",
            render: function(data, type, row, meta) {
                return moment(data).format('l')
            },
            visible: false
        }, {
            data: "time",
            title: "Time",
            name: "time",
            visible: false
        }, {
            data: "address",
            title: "Address",
            name: "address",
            visible: false
        }, {
            data: "pddistrict",
            title: "District",
            name: "pddistrict",
            visible: false
        }, {
            className: "mobile",
            data: "category",
            title: "Category",
            name: "category",
        }, {
            data: "descript",
            title: "Description",
            name: "descript",
        }, {
            className: "mobile tablet",
            data: "resolution",
            title: "Resolution",
            name: "resolution",
        },
        {
            data: "cscategory",
            title: "cscategory",
            name: "cscategory",
        }
                 ],
        pageLength: 50,
        footerCallback: function(tfoot, data, start, end, display) {
            var dupHeaderRow = $(this.api().table().header()).children('tr:first').clone()
        }
    };

    var _table;

    function _init() {
        _table = $('#example').DataTable(TABLE_CONFIG);
    }
    
  
  function cscategory(incidentJson){
  
   for(var i = 0 ; i<incidentJson.length ; i++){
        var c = incidentJson[i].category;
        var d = incidentJson[i].descript;
        var r = incidentJson[i].resolution;
            
        if(c=="ASSAULT" && d.includes("AGGRAVATED")) {
            incidentJson[i].cscategory ="ASSAULT";        
        }else if(c=="DRUG/NARCOTIC" && r.includes("ARREST")){
            incidentJson[i].cscategory="DRUG RELATED VIOLATIONS";      
        }else if(c=="ASSAULT" && (d.includes("WEAPON") || d.includes("GUN") || d.includes("KNIFE")
            || d.includes("BODILY FORCE") || d.includes("SEMI-AUTO") || d.includes("MACHINE GUN")) &&     
            r.includes("ARREST")){ 
            incidentJson[i].cscategory="WEAPONS PO+SSESION"; 
        }else if (c=="ASSAULT" && d.includes("HATE")){
            incidentJson[i].cscategory="HATE CRIME";
        }else if (c=="ASSAULT" && d.includes("FIREARM") && r.includes("ARREST")){
            incidentJson[i].cscategory="WEAPONS POSSESION";
        }else if (c=="ASSAULT" && d.includes("SHOOTING") &&
            r.includes("ARREST")){
            incidentJson[i].cscategory="WEAPONS POSSESION";
        }else if (c=="ASSAULT" && d.includes("STALKING")){
            incidentJson[i].cscategory="STALKING";
        }else if (c=="ASSAULT" && d.includes("TERROR")){
            incidentJson[i].cscategory="HATE CRIME";    
        }else if (c=="BURGLARY"){
            incidentJson[i].cscategory="BURGLARY";
        }else if (c=="DRIVING UNDER THE INFLUENCE" && d.includes("ALCOHOL") && r.includes("ARREST")){
            incidentJson[i].cscategory="LIQUOR LAW VIOLATION";
        }else if (c=="DRUGS/NARCOTICS" && r.includes("ARREST")){
        incidentJson[i].cscategory="DRUG RELATED VIOLATION";
        }else if (c=="DRUNKENNESS" && r.includes("ARREST")){
        incidentJson[i].cscategory="LIQUOR LAW VIOLATION";
        }else if (c=="lIQUOR LAWS" && r.includes("ARREST")){
        incidentJson[i].cscategory="LIQUOR LAW VIOLATION";
        }else if (c=="OTHER OFFENSES" &&
        d.includes("ALCOHOL") && r.includes("ARREST")){
        incidentJson[i].cscategory="LIQUOR LAW VIOLATION"; 
        }else if (c=="ROBBERY"){
        incidentJson[i].cscategory="ROBBERY";
        }else if (c=="SECONDARY CODES" && d.includes("DOMESTIC VIOLENCE")){
        incidentJson[i].cscategory="DOMESTIC VIOLENCE";
        }else if (c=="SECONDARY CODES" && d.includes("PREJUDICE")){
        incidentJson[i].cscategory="HATE CRIMES";       
        }else if (c=="SECONDARY CODES" && d.includes("PREJUDICE")){
        incidentJson[i].cscategory="HATE CRIMES";
        }else if (c=="SECONDARY CODES" && d.includes("WEAPONS")){
        incidentJson[i].cscategory="WEAPONS POSSESION";  
        }else if (c=="SEX OFFENSES, FORCIBLE" && d.includes("WEAPONS")){
        incidentJson[i].cscategory="WEAPONS POSSESION";     
        }else if (c=="SEX OFFENSES,NON FORCIBLE"){
        incidentJson[i].cscategory="SEX OFFENSES";
        }else if (c=="VEHICLE THEFT"){
        incidentJson[i].cscategory="MOTOR VEHICLE THEFT";         
        }else if (c=="WEAPONS LAW" && r.includes("ARREST")){
        incidentJson[i].cscategory="WEAPONS POSSESION";    
        }else{
            incidentJson[i].cscategory="NONE";
        }
        
        }//end of for
    }//end of function
               

    function _loadDataToTable(incidentJson) {
        _table.clear();
        cscategory(incidentJson);
        _table.rows.add(incidentJson);
        _table.draw();
    }

    return {
        init: _init,
        loadDataToTable: _loadDataToTable
    };

})(window, jQuery);
