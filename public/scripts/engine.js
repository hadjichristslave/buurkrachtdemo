var myCenter=new google.maps.LatLng(longlat[0][16], longlat[0][17]);
var markerRed;
var query;
var map;
var markers;
var markerCluster;
var contentString;
function search(index){
    var subQuery1 = longlat[index][1].toLowerCase().indexOf(query) != -1
    var subQuery2 = longlat[index][2].toLowerCase().indexOf(query) != -1
    var subQuery3 = longlat[index][3].toLowerCase().indexOf(query) != -1
    return subQuery1 || subQuery2 || subQuery3;
}

function setAllMap(map, filtered){
    markers = [];
    for (var i = 0; i < longlat.length; i++) {
        if(longlat[i][16]=="NULL" || longlat[i][17]=="NULL") continue;

        if(filtered==false) {}
        else if(search(i)==false) continue; 

        var pos=new google.maps.LatLng(longlat[i][16], longlat[i][17]);
        var marker=new google.maps.Marker({
            position:pos,
            icon:'img/marker.png',
        });
        contentString = '<div id="content" >'+
            '<h1 class="firstHeading">'+longlat[i][1]+'</h1>'+
            '<div id="siteNotice">'+longlat[i][2] +
            '</div>'+
            '<div id="bodyContent">'+
            '<p> '+longlat[i][3] +'  </p>' +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 450,
            zIndex: null,
            boxStyle: {
                opacity: 0.75,
            width: "400px",
            height:"400px"
            },
            infoBoxClearance: new google.maps.Size(1, 1)
        });
        var title = longlat[i][1];
        google.maps.event.addListener(marker,'click', (function(marker,title,contentString,infowindow){ 
            return function() {
                marker.setIcon("img/marker-selected.png");
                infowindow.setContent(contentString);
                infowindow.open(map,marker);
                markerRed = marker;
                $("#displayDiv").find(".title").find('p').first().text(title);
                $("#displayDiv").show(400);
            };
        })(marker,title,contentString,infowindow));  

        google.maps.event.addListener(infowindow,'closeclick',function(){
            markerRed.setIcon("img/marker.png"); 
            $("#displayDiv").hide(400);
        });

        markers.push(marker);
    }
    markerCluster = new MarkerClusterer(map, markers);
}
function empty(){
    markerCluster.clearMarkers();
}
function initialize(){
    var mapProp = {
        center:myCenter,
        zoom:7,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true

    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    google.maps.event.addListener(map, 'zoom_changed', function() {
        update(); 
    });
    setAllMap(map,false);
}

function update(){
    empty();
    query = document.getElementById("query").value;
    setAllMap(map,query!=="");
}

google.maps.event.addDomListener(window, 'load', initialize);
