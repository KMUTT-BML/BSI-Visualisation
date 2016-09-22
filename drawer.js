$(function (){

    var source = new Array();
    var target = new Array();
    var edges = new Array();

    //get each data from object
    for(i=0;i<cytosol.length;i++){
        //separate pathway by color of node
        //color for node of sucrose/starch metabolism pathway
        var color = '#DF013A';

        if (cytosol[i].pathway.includes("nucleotide biosynthesis")) {
            color = '#FCB1ED';
        }
        else if(cytosol[i].pathway.includes("cell wall biosynthesis")){
            color = '#FCB1ED';
        }
        else if (cytosol[i].pathway.includes("pentose phosphate")) {
            color = '';       
        }
        else if (cytosol[i].pathway.includes("respiration")) {
            color = '';
        }
        else if (cytosol[i].pathway.includes("amino acid biosynthesis")) {
            color = '';
        }
        else if (cytosol[i].pathway.includes("fatty acid biosynthesis")) {
            color = '';
        }
        else if (cytosol[i].abbr.startsWith("T")) {//transporter
            color = '';
        }
        else if (cytosol[i].abbr.startsWith("E")) {//external
            color = '#000000';
        }

        //create node with source and target -------------------------------

        var sourceData;
        //set source node
        //if there is substance value in array
        if (cytosol[i].substance != undefined) {
            sourceData = {
                "data" : {
                    "id" : cytosol[i].substance + '-' + cytosol[i].abbr,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 15,
                    "height" : 15
                }
            };
        }
        else{// if there is no substance value in arry, so flux will be source
            sourceData = {
                "data" : {
                    "id" : cytosol[i].abbr,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 5,
                    "height" : 5
                }
            };
        }

        source.push(sourceData);

        var targetData;
        //set target node
        //if there is product value in array
        if (cytosol[i].product != undefined) {
            targetData = {
                "data" : {
                    "id" : cytosol[i].abbr + '-' + cytosol[i].product,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 15,
                    "height" : 15
                }
            };
        }
        else{// if there is no substance value in arry, so flux will be source
            targetData = {
                "data" : {
                    "id" : cytosol[i].abbr,
                    "nc": color,
                    "shape" : 'ellipse',
                    "width" : 5,
                    "height" : 5
                }
            };
        }

        target.push(targetData);
        
        // Create edge ----------------------------------------------
        var edgeData;
        //edge between substance and flux
        if (cytosol[i].substance != undefined) {
            edgeData = {
                "data" : {
                    "id": data[i].substance + '-' + data[i].name,
                    "weight": 4,
                    "source": data[i].substance,
                    "target": data[i].abbr,
                    "target_arrow" : data[i].target_arrow,
                    "source_arrow" : data[i].source_arrow
                }
            };
        }
        else{//edge between flux and product
            edgeData = {
                "data" : {
                    "id": data[i].name + '-' + data[i].product,
                    "weight": 4,
                    "source": data[i].abbr,
                    "target": data[i].product,
                    "target_arrow" : data[i].target_arrow,
                    "source_arrow" : data[i].source_arrow
                }
            };
        }
        edges.push(edgeData);
    }


    nodes = target.concat(source);

    // Draw graph
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in

        boxSelectionEnabled: false,
        autounselectify: true,

        elements : {
            nodes : nodes,
            edges : edges
        },

        style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(id)',
            'color' : '#000',
            'background-color': 'data(nc)',
            'shape' : 'data(shape)'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'data(target_arrow)',
            'source-arrow-shape': 'data(source_arrow)',
            'width': "data(weight)",
            'line-color': '#000',
            'source-arrow-color': '#000',
            'target-arrow-color': '#000',
            'curve-style': 'bezier'
        }),

        layout: {
          name: 'cose',
//          roots: '#a',
          rows: 1,
          directed: true
        }

    });

    console.log(cy.layout.name);

});
