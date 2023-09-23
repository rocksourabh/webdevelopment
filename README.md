# Introduction 
TODO: This a Excel Clone project with features like 2 way Binding of Cells , Exel CRUD Operations , Column Resizing and Graph Detection Features. 

# Getting Started
TODO: TO run this code on your system:
1.	Download the Zip File of this repo.This will install Html , Css and Js Files.
2.	Extract the zip in a folder.
3.	Run the folder with VS Code and Execute the index.html file.

# Build and Test
To Test My Project : 
1)Test Two way binding of cells:You can Enter Data and give style , font color and alignments.Now check by clicking on each cell whether the properties you have assigned are highlighted as per excel.
2)Checking Formula Functionality :Take a Cell A1 and enter a numeric value like 10 in it. Now click on cell B1 and on formula bar write formula (A1 + 10) and hit enter . Check the value 20 will appear in B1 Cell.
Now Also change value of A1 cell, hit enter and you will notice the value of B1 also gets changed.
3)Test Column Resize Feature:Hover on any column Cell border , you will notice the cursor will change to Column-resize icon and hold the right click and drag it to right & Left and you will notice the size of Column will Change. 
4)Test Cyclic Graph Detection : Take a cell A2 and enter a value 10 on it. Now click on cell B1 and enter a formual in formula bar (A2 + 10) and you will see a value 20 on this cell.Click on Cell C2 and enter a formula on Formual Bar (B1+10) on this cell.now click on cell A2 and enter a formula on formual bar (C2+10), when you will enter then you will see a pop a cycel detection message, when you will click ok , you will see the excel will visualize the cells where cycle will form.
5)Sheet Handling : When you open excel,by default you will be on sheet 1 , add some data in sheet 1 & click on  add sheet icon , now add some data in sheet2 also.Now navigate to sheet1 and sheet 2 simultaneoulsy and you will see you data will remain isolated for both sheets.In this way we can manage mulitple excel sheets .
6)Download & Upload Sheets : We can download sheet  when click on download icon in properties pane, the file will be downloaded in .json format.Now try to upload this file by clicking on upload icon in properties pane and select the .json file which we dowloaded , you will see your data on excel new sheet.
# Contribute
We can contribute and make it better with Implementing lots of more features excel has in it's properties pane.Take one of feature of excel that you finds fascinating and try to implement it , surely we will learn more in this process of development.

