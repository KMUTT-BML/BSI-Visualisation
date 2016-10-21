$(function() {

    var source = new Array();
    var target = new Array();
    var edges = new Array();

    //get each data from object
    for (i = 0; i < data.length; i++) {
        //separate pathway by color of node
        //color for node of sucrose/starch metabolism pathway
        var color = '#DF013A';

        if (data[i].pathway == "nucleotide biosynthesis pathway") {
            color = '#FCB1ED';
        } else if (data[i].pathway == "cell wall biosynthesis pathway") {
            color = '#B20FC8';
        } else if (data[i].pathway == "pentose phosphate pathway") {
            color = '#305CF8';
        } else if (data[i].pathway == "respiration pathway pathway") {
            color = '#59F0F8';
        } else if (data[i].pathway == "amino acid biosynthesis pathway") {
            color = '#59F87E';
        } else if (data[i].pathway == "fatty acid biosynthesis pathway") {
            color = '#FF983E';
        } else if (data[i].abbr.startsWith("T") == true) { //transporter
            color = '#FBF97C';
        } else if (data[i].abbr.startsWith("E") == true) { //external
            color = '#000000';
        };


        //create node with source and target -------------------------------

        var sourceData;
        var targetData;
        //set source node
        //if there is substance value in array
        if (data[i].substance != undefined) {
            sourceData = {
                "data": {
                    "id": data[i].substance,
                    "content": '',
                    "nc": '#959090',
                    "shape": 'ellipse',
                    "width": 5,
                    "height": 5
                }
            };

            targetData = {
                "data": {
                    "id": data[i].reaction,
                    "content": data[i].name,
                    "nc": color,
                    "shape": data[i].shape,
                    "width": 15,
                    "height": 15
                }
            };
        } else { // if there is no substance value in arry, so flux will be source
            sourceData = {
                "data": {
                    "id": data[i].reaction,
                    "content": data[i].name,
                    "nc": color,
                    "shape": data[i].shape,
                    "width": 15,
                    "height": 15
                }
            };

            targetData = {
                "data": {
                    "id": data[i].product,
                    "content": '',
                    "nc": '#959090',
                    "shape": 'ellipse',
                    "width": 5,
                    "height": 5
                }
            };
        }
        source.push(sourceData);
        target.push(targetData);

        // Create edge ----------------------------------------------
        var edgeData;
        //edge between substance and flux
        if (data[i].substance != undefined) {
            edgeData = {
                "data": {
                    "id": data[i].substance + '-' + data[i].name,
                    "weight": 1,
                    "source": data[i].substance,
                    "target": data[i].reaction,
                    "target_arrow": data[i].target_arrow,
                    "source_arrow": data[i].source_arrow
                }
            };
        } else { //edge between flux and product
            edgeData = {
                "data": {
                    "id": data[i].name + '-' + data[i].product,
                    "weight": 1,
                    "source": data[i].reaction,
                    "target": data[i].product,
                    "target_arrow": data[i].target_arrow,
                    "source_arrow": data[i].source_arrow
                }
            };
        }
        edges.push(edgeData);

    }


    nodes = target.concat(source);


    // Draw graph -----------------------------------------------------------
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in

        boxSelectionEnabled: false,
        autounselectify: true,

        elements: {
            nodes: nodes,
            edges: edges
        },

        style: cytoscape.stylesheet()
            .selector('node')
            .css({
                'content': 'data(content)',
                'color': '#000',
                'width': 'data(width)',
                'height': 'data(height)',
                'background-color': 'data(nc)',
                'shape': 'data(shape)'
            })
            .selector('edge')
            .css({
                'target-arrow-shape': 'data(target_arrow)',
                'source-arrow-shape': 'data(source_arrow)',
                'width': "data(weight)",
                'line-color': '#DCD9D9',
                'haystack-radius': 5,
                'source-arrow-color': '#DCD9D9',
                'target-arrow-color': '#DCD9D9',
                'curve-style': 'bezier'
            }),

        layout: {
            name: 'grid',
            //roots: '#a',
            padding: 100,
            //rows: 1,
            directed: false
        }

    });

    cy.elements().qtip({
        content: function(){ return this.id() },
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
    });

});
