//Auguste Smolskaite, MKDf-20/4
//After Effects 2023
//Ying Yang

app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
app.newProject();

var compW = 1920;
var compH = 1080;
var compA = 1;
var compFPS = 25;
var w2 = compW/2;
var h2 = compH/2;

//PROMPT
var durationNumber = null;
//Value
while ((durationNumber == null) || (isNaN(durationNumber)) || (durationNumber%1 !== 0) || (durationNumber < 1) || (durationNumber > 60))
{
    durationNumber = prompt("Enter value of animation time (in range [1, 60])", 0);
    if ((durationNumber == null) || (isNaN(durationNumber)) || (durationNumber%1 !== 0) || (durationNumber < 1) || (durationNumber > 60))
    {
        alert("Please enter an INTEGER in range [1, 60]");
    }
}
var durationNum = parseInt(durationNumber);

//compositions
var myComp = app.project.items.addComp("myComp",compW,compH,compA,durationNum,compFPS);
var myCompYY2 = app.project.items.addComp("myCompYY2",compW,compH,compA,durationNum,compFPS);
var myCompYY3 = app.project.items.addComp("myCompYY3",compW,compH,compA,durationNum,compFPS);
myComp.openInViewer();
var layerYingYang2 = myComp.layers.add(myCompYY2);
var layerYingYang3 = myComp.layers.add(myCompYY3);

layerYingYang2.property("Rotation").expression = 
'''startRotation = 0;
rotationControl = comp("myComp").layer("'''+myNullName+'''").effect("'''+sliderName+'''")("Slider");
duration = '''+durationNum+''';
linear(time, 0, duration, startRotation, startRotation + (180 * rotationControl));''';  

layerYingYang3.property("Rotation").expression = 
'''startRotation = 0;
rotationControl = thisComp.layer("'''+myNullName+'''").effect("'''+sliderName+'''")("Slider");
duration = '''+durationNum+''';
linear(time, 0, duration, startRotation, startRotation + (180*rotationControl));''';
//bakcground
var mySolid = myComp.layers.addSolid([45,45,45]/255,"Background",compW,compH,compA,durationNum);
mySolid.property("Opacity").setValue([50]);

// Glow effect
var glowEffectLayer = myComp.layers.addSolid([0, 0, 0]/255, "glowEffect", compW, compH, compA, durationNum);
glowEffectLayer.adjustmentLayer = true;
// parameters
var glowEffect = glowEffectLayer.Effects.addProperty("ADBE Glo2");
glowEffect.property("Glow Threshold").setValue([60]);
glowEffect.property("Glow Radius").setValue([60]);
glowEffect.property("Glow Intensity").setValue([1]);
//radial blur effect
var radialBlurEffectLayer = myComp.layers.addSolid([0, 0, 0]/255, "radialBlurEffect", compW, compH, compA, durationNum);
radialBlurEffectLayer.adjustmentLayer = true;
//parameters
var radialBlurEffect = radialBlurEffectLayer.Effects.addProperty("ADBE Radial Blur");
radialBlurEffect.property("Amount").setValue([10]);

//controllers
var myNull = myComp.layers.addNull();
var myNullName = myNull.source.name = ("Controllers");
//rotationspeed
var sliderRotationSpeed = myNull.property("Effects").addProperty("ADBE Slider Control");
var sliderName = sliderRotationSpeed.name = ("rotationSpeed");
myNull.effect(sliderName).property("Slider").expression = '''clamp(value,2,10);''';
//mainColor
mainColor = ([255,255,0]/255);
var colorMainColor = myNull.property("Effects").addProperty("ADBE Color Control");
var colorName1 = colorMainColor.name = ("mainColor");
myNull.effect(colorName1).property("Color").setValue(mainColor);
//secondColor
secColor = ([0,255,0]/255);
var colorSecondColor = myNull.property("Effects").addProperty("ADBE Color Control");
var colorName2 = colorSecondColor.name = ("secondColor");
myNull.effect(colorName2).property("Color").setValue(secColor);

// arrays for coordinates
var coords_1 = new Array;
var coords_2 = new Array;

//real shape vector DATA from ADOBE illustrator
var coords_1 = [[2170,979.97998046875],[2270.02001953125,1080],[2170,1180.02001953125],[2069.97998046875,1080]];					
var inTang_1 = [[-55.240234375,0],[0,-55.239990234375],[55.239990234375,0],[0,55.239990234375]];
var outTang_1 = [[55.239990234375,0],[0,55.239990234375],[-55.240234375,0],[0,-55.239990234375]];

var coords_2 = [[2170,830],[1920,1080],[1670,1330],[1420,1080],[1920,1580],[2420,1080]];				
var inTang_2 = [[138.06982421875,0],[0,-138.070007324219],[138.070068359375,0],[0,138.069946289062],[-276.140014648438,0],[0,276.140014648438]];
var outTang_2 = [[-138.070068359375,0],[0,138.069946289062],[-138.070068359375,0],[0,276.140014648438],[276.139892578125,0],[0,-138.070007324219]];

function drawPaths(compositionName, coords1,inTang1,outTang1,coords2,inTang2,outTang2,name1,name2,name3,addTrimPaths,initialRotation, color1, color2){

    var elementCount = coords1.length;  
	// Atliekamos X ir Y transformacijos figuroms shape1
	for(i=0; i<elementCount; i++)
	{
		for(j=0; j<2; j++)
		{
			if(j==0)
			{
				coords1[i][j] += -1920; // X transformacija
			}
			else
			{
				coords1[i][j] +=-1080; // Y transformacija
			}
		}
	}
	// Atliekamos X ir Y transformacijos figuroms shape2
    var elementCount2 = coords2.length;
	for(i=0; i<elementCount2; i++)
	{
		for(j=0; j<2; j++)
		{
			if(j==0)
			{
				coords2[i][j] += -1920; // X transformacija
			}
			else
			{
				coords2[i][j] +=-1080; // Y transformacija
			}
		}
	}
    // Pridedami visi path ir grupes vienam shape layer'iui
    // SHAPE 2 - DROP
    var myShapeLines2 = compositionName.layers.addShape();
    myShapeLines2.name = name2;
    var myShapeContent2 = myShapeLines2.property("Contents").addProperty("ADBE Vector Shape - Group");
    var myShapeMask2 = myShapeContent2.property("Path");
    var myShapeM2 = myShapeMask2.value;
    myShapeM2.vertices = coords2;
    myShapeM2.outTangents = outTang2;
    myShapeM2.inTangents = inTang2;
    myShapeM2.closed = true;
    myShapeMask2.setValue(myShapeM2);
    //COLOR
    var myShapeFill2 = myShapeLines2.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    myShapeFill2.property("Color").setValue(color2);
   
    // SHAPE 1 - CIRCLE
    var myShapeLines1 = compositionName.layers.addShape();
    myShapeLines1.name = name1;
    var myShapeContent1 = myShapeLines1.property("Contents").addProperty("ADBE Vector Shape - Group");
    var myShapeMask1 = myShapeContent1.property("Path");
    var myShapeM1 = myShapeMask1.value;
    myShapeM1.vertices = coords1;
    myShapeM1.outTangents = outTang1;
    myShapeM1.inTangents = inTang1;
    myShapeM1.closed = true;
    myShapeMask1.setValue(myShapeM1);
    //COLOR
    var myShapeFill1 = myShapeLines1.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    myShapeFill1.property("Color").setValue(color1);

    // SHAPE 3 - DROP STROKE
    var myShapeLines3 = compositionName.layers.addShape();
    myShapeLines3.name = name3;
    var myShapeContent3 = myShapeLines3.property("Contents").addProperty("ADBE Vector Shape - Group");
    var myShapeMask3 = myShapeContent3.property("Path");
    var myShapeM3 = myShapeMask3.value;
    myShapeM3.vertices = coords2;
    myShapeM3.outTangents = outTang2;
    myShapeM3.inTangents = inTang2;
    myShapeM3.closed = true;
    myShapeMask3.setValue(myShapeM3);

    // STROKE PROPERTY
    var myShapeStroke = myShapeLines3.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
    myShapeStroke.property("Opacity").setValue([50]);
    myShapeStroke.property("Stroke Width").setValue([25]);
    myShapeStroke.property("Color").expression =
    '''mainColor = comp("myComp").layer("'''+myNullName+'''").effect("'''+colorName1+'''")("Color");
       secondColor = comp("myComp").layer("'''+myNullName+'''").effect("'''+colorName2+'''")("Color");
       duration = '''+durationNum+''';
       if (time <= duration/2) {
       linear(time, 0, duration/2, mainColor, secondColor);
       } else {
       secondColor;
       }''';
      
    //TRIM PATHS
    if (addTrimPaths == 1) {
        var trimPaths = myShapeLines3.property("Contents").addProperty("ADBE Vector Filter - Trim");

        trimPaths.property("Start").expression = 
        '''startValue = 0;
           endValue = 100;
           duration = '''+durationNum+''';
           linear(time, 0, duration, startValue, endValue);''';
    }
    //SECOND HALF ROTATION
    if(initialRotation == 180){
        
        myShapeFill1.property("Color").setValue(color1);
        myShapeFill2.property("Color").setValue(color2);
        myShapeLines1.property("Transform").property("Rotation").setValue([180]);
        myShapeLines2.property("Transform").property("Rotation").setValue([180]);
        myShapeLines3.property("Transform").property("Rotation").setValue([180]);
        
        myShapeLines1.property("Transform").property("Anchor Point").setValue([-1920,-1080]); // Replace x and y with your desired coordinates     
        myShapeLines2.property("Transform").property("Anchor Point").setValue([-1920,-1080]); // Replace x and y with your desired coordinates
        myShapeLines3.property("Transform").property("Anchor Point").setValue([-1920,-1080]); // Replace x and y with your desired coordinates

    }
    else{
        myShapeFill1.property("Color").setValue(color2);
        myShapeFill2.property("Color").setValue(color1);
        myShapeLines1.property("Transform").property("Rotation").setValue([0]);
        myShapeLines2.property("Transform").property("Rotation").setValue([0]);
        myShapeLines3.property("Transform").property("Rotation").setValue([0]);
    }
  }
//COLORS FOR myCompYY2 and myCompYY3
var colorForShape1 = [0, 0, 0] / 255;
var colorForShape2 = [255, 255, 255] / 255; 
var comp2 = drawPaths(myCompYY2,coords_1,inTang_1,outTang_1,coords_2,inTang_2,outTang_2,"Circle","Drop","Drop Stroke", 1,0, colorForShape1, colorForShape2);
var comp3 = drawPaths(myCompYY3,coords_1,inTang_1,outTang_1,coords_2,inTang_2,outTang_2,"Circle","Drop","Drop Stroke", 1,180, colorForShape1, colorForShape2);

myNull.moveToBeginning();
app.executeCommand(2004);
myNull.selected = true;
app.executeCommand(2163);

