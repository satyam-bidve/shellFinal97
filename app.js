const ovelvalues = [];   
const corevalues = [];
const ovelX = [];
const ovelY = [];
const coreX = [];
const coreY = [];
const corediag = [];
let pairs = [];

//------------------------------------------------------------------------------------ BESIC VALUES

let coreCount = 0;      // hOW MANY CORE USER CREATED 

let foundOvelX = 0;   // FOUNDED VALUES OF FINAL SHELL WIDTH
let foundOvelY = 0;   // FOUNDED VALUES OF FINAL SHELL hEIGHT
let major = 0;         // FOUNDED VALUES OF FINAL SHELL MAJOR LENGTH AXIS
let minor = 0;         // FOUNDED VALUES OF FINAL SHELL MINOR LENGTH AXIS
let sumdiag = 0;
let j = 1 ;
//-------------------------------------------------------------------------------------------lOGICAL vALUES







//################################################################################### start of $Doc.ready
$(document).ready(function(){
     //$(document).on('dblclick', '.draggable', rotateMe);
     // lets change ovels shape here user value 
     // access that ovel div -> change css property width and height
     // take care of array index to match correctly with ovel x and y values :)
     // getting values x -y  from the number input for creating shell
    $("#btngetVal").click(function(){ 

    
      var box = document.getElementById("showOvels");
      var htmlString = ""
       for(var i = 1 ; i <= 6 ; i++){
           htmlString = `
                    <div class="oval" id="ovel${i}" style = "width :${$(`#ox${i}`).val()}; height :${$(`#oy${i}`).val()};"></div>
                  
                  `
                      box.innerHTML += htmlString;
                      ovelvalues.push($(`#ox${i}`).val());
                      ovelX.push($(`#ox${i}`).val());
                      ovelvalues.push($(`#oy${i}`).val());
                      ovelX.push($(`#oy${i}`).val());
                      
       };
       $("#pBar").css({"width": "30%"});
      // Sort the array based on the minimum of width and height
      ovelvalues.sort((a, b) => Math.min(a, b) - Math.min(a, b));
      for (let i = 0; i < ovelvalues.length; i += 2) {
        pairs.push([ovelvalues[i], ovelvalues[i + 1]]);
       }
       pairs.sort((a, b) => Math.min(a[0], a[1]) - Math.min(b[0], b[1]));
      // console.log("pairs start");
      // console.log(pairs);
      //// console.log("pairs ends");
        singleDimensionArray = pairs.flat();
       //console.log("insingle");
      //console.log(singleDimensionArray);
  })

   

    
    

  
  
// here we get the user value of how many core he wants
// Function to create table dynamically so that we get all cores diamention
 $("#btnGetCoreCount").click(function(){
  coreCount = $("#getCoreCount").val()
    var table = document.getElementById("DynamicTable");
     for(var i = 1 ; i <= coreCount ; i++){
        var row = `
                    <tr>
                    <td>core ${i}</td>
                    <td><input type="number" id="cx${i}"></td>
                    <td><input type="number" id="cy${i}"></td>
                    </tr>
                    `
            table.innerHTML += row;
     }
    })
    // step 2 - creating core from user input diamensions
    // now need to make this dynamic
    // function to display the created cores with given diamension
    $("#btnCreateCore").click(function(){
        var box = document.getElementById("coreBox");
        var htmlString = ""
         for(var i = 1 ; i <= coreCount ; i++){
             htmlString = `
                      <div class="core" id="core${i}" style = "width :${$(`#cx${i}`).val()}; height :${$(`#cy${i}`).val()};"></div>
                    
                    `
                        box.innerHTML += htmlString;
                        corevalues.push($(`#cx${i}`).val());
                        coreX.push($(`#cx${i}`).val());
                        corevalues.push($(`#cy${i}`).val());
                        coreY.push($(`#cy${i}`).val());
                        corediag.push(Math.sqrt(Math.pow($(`#cx${i}`).val(), 2) + Math.pow($(`#cy${i}`).val(), 2)));
                        
         };
         $("#pBar").css({"width": "60%"});
         sumdiag = corediag.reduce((partialSum, a) => Number(partialSum)+ Number(a), 0);
        })


      

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@_Main Logic_@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   // STEP 3  on click find max area all cores - fit to the ovel --
   $("#btnfindOvel").click(function(){
    // Here we will find the max length - and width X -Y in cores sums 
    // check if the max width (sum of x) of cores is less than the width of leasr ovel 
    // same goes with height

 
    
    // now check the ovel which have more x than maxWidthCore && more Y than maxHeightCore
    let found = false; // to break the loop at required point
    for (let i = 0; i < singleDimensionArray.length; i += 2) {
      for (let j = i + 1; j < singleDimensionArray.length; j += 2) {
          if (singleDimensionArray[i] > sumdiag && singleDimensionArray[j] > sumdiag) {
              found = true;
              console.log(singleDimensionArray[i] + " and " + singleDimensionArray[j]);
              foundOvelX = singleDimensionArray[i] ;  
              foundOvelY = singleDimensionArray[j] ;
              break; // Break the inner loop if the condition is met
          }
          break; // break on evry single iteration
      }
      if (found) {
          break; // Break the outer loop if the condition was met
      }
  }
     // if no shell is there tofit requred core
     if(foundOvelX == 0 && foundOvelY == 0){
        alert("No shell found here to fit all cores");
        location.reload(); // clear everything
     }
    
    // if shell found then change shell diamensions of found one
    $("#ellipse").css({"width":foundOvelX , "height":foundOvelY}) //<- change the eclips diamention here 
      //console.log("without sorted");
      //console.log(ovelvalues);

   
     $("#pBar").css({"width": "100%"});
   });
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


   // on click we create the  of cores  dynamically inside of shell  
  $("#btnCreateCoreSVG").click(function() {

   
    
    for (var i = 1; i <= coreCount; i++) {  // positioning problem 
      createBox(i);
    }
   
   
     

   function createBox(i) {
    var box = document.createElement('div');
    box.className = 'box';
    box.dataset.id = i;
   
   //box.style.zIndex = `var(--zi-${i})`;
    box.style.width = `${$(`#cx${i}`).val()}px`; // Assuming #cx${i} is an input field for width
    box.style.height = `${$(`#cy${i}`).val()}px`; // Assuming #cy${i} is an input field for height
    box.style.backgroundColor = `var(--bg-1)`;

    initializeBox(box);

    // Append the new box to the container
    document.getElementById('ellipse').appendChild(box);
   }
    
});


                    







function initializeBox(box) {



  $(function() {
    // Make the box draggable, resizable, and rotatable
    
   $(box).draggable({
    containment: "parent" // This ensures the box stays within its parent
  });

  
   
  
  var params = {
    start: function(event, ui) {
       // console.log("Rotating started")
       //console.log(box.dataset.id);
    },
    rotate: function(event, ui) {
        if (Math.abs(ui.angle.current > 6)) {
          //console.log("Rotating " + ui.angle.current);
        }
    },
    stop: function(event, ui) {
       // console.log("Rotating stopped");
    },
};
   $(box).rotatable(params);
    $(box).resizable({
      
       handles: "n, e, s, w, ne, se, sw, nw"
     });



 
  });
 

 
}








  



  
});
//################################################################################### End of $Doc.ready



/**
 *   on btncreatecore -> corediag.push(Math.sqrt(Math.pow($(`#cx${i}`).val(), 2) + Math.pow($(`#cy${i}`).val(), 2)));
 *  this sum should < minor -> sumdiag = corediag.reduce((partialSum, a) => Number(partialSum)+ Number(a), 0);
                    console.log(sumdiag + " this is sum of diag");
 * 
 */