$(function (){

    var source = new Array();
    var target = new Array();
    var edges = new Array();

    //get each data from object
    for(i=0;i<cytosol.length;i++){
        //separate pathway by color of node
        //color for node of sucrose/starch metabolism pathway
        var color = '#DF013A';
        if (cytosol[i].pathway == 'nucleotide biosynthesis pathway') {
            color = '#FCB1ED';
        }
        else if(cytosol[i].pathway == 'cell wall biosynthesis pathway'){
            color = '#FCB1ED';
        }
        else if (cytosol[i].pathway == 'pentose phosphate pathway') {
            color = '';       
        }

        //if this reaction is the substance side
        if (cytosol[i].substance != undefined) {
            cData = {
                "data" : {
                    "id" : cytosol[i].substance + '-' + cytosol[i].abbr,
                    "nc": '#6ab8ff',
                    "shape" : 'pentagon'
                }
            };
        }

        // Create node
        cData = {
            "data" : {
                "id" : cytosol[i].publisher,
                "nc": '#6ab8ff',
                "shape" : 'pentagon'
            }
        };

        // Filter and set node data
        // Set default data
        publishers.push(cData);
        
        weight = 1;
        gameColor = '#aabbcc';

        // Filter by category
        if(data[i].category.toLowerCase() == 'fps'){
            weight = 2;
            gameColor = '#e06b04';
        }else if(data[i].category.toLowerCase() == 'moba'){
            gameColor = '#5b4b49';
            weight = 5;
        }

        gameData = {
            "data" : {
                "id" : data[i].game,
                "nc": gameColor,
                "shape" : 'ellipse'
            }
        };
        games.push(gameData);

        // Create edge
        edgeData = {
            "data" : {
                "id": data[i].publisher + '-' + data[i].game,
                "weight": weight,
                "source": data[i].publisher,
                "target": data[i].game
            }
        };
        edges.push(edgeData);
    }

    console.log(edges);
    console.log(games);
    console.log(publishers);

    nodes = games.concat(publishers);

    // Draw graph
    var cy = cytoscape({
        container: document.getElementById('cy'), // container to render in

        boxSelectionEnabled: false,
        autounselectify: true,

//        elements: { // list of graph elements to start with
//            nodes : [
//               { data: { id: 'a', nc: '#aabbcc' } },
//               { data: { id: 'b', nc: '#aabbcc' } },
//               { data: { id: 'a', nc: '#aabbcc'} },
//               { data: { id: data[0].game, nc: '#aabbcc'} }
//            ],
//            edges : [
//                { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } }
//            ]
//        },
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
            'target-arrow-shape': 'triangle',
//            'source-arrow-shape': 'triangle',
            'width': "data(weight)",
            'line-color': '#8a38ae',
            'source-arrow-color': '#8a38ae',
            'target-arrow-color': '#8a38ae',
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
