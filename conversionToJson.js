const readline=require('readline');
const fs=require('fs');
var arr=[];
var i=0;
var header=[];

const rl=readline.createInterface({
  input:fs.createReadStream('Crimes_-_2001_to_present.csv')
});
rl.on('line',function(line){
  //  arr=(line.match(/(?:"[^"]*"|[^,])+/g));
  arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

  if(i==0){i++;
    var header=headers(arr);}
    else
    {
      //var theft=filter1(arr);
      //var assault=filter2(arr);
      var typeOfCrime=filter3(arr);
    }
  })
  .on('close',function(){
    //fs.writeFile('crimes.json',JSON.stringify(theft.sort(function(p1, p2) { return p1.year - p2.year; }), null, ' '));
    //fs.writeFile('assaults.json',JSON.stringify(assault.sort(function(p1, p2) { return p1.year - p2.year; }), null, ' '));
    //fs.writeFile('typeOfCrime.json',JSON.stringify(typeOfCrime, null, ' '));
  })


  function headers(line)
  {
    header=arr;
    return header;
  }


  var theft=[];
  var assault=[];
  var typeOfCrime=[];

//first JSON
  function filter1(line)
  {
    if(line[header.indexOf("Description")]==="OVER $500")
    {var ctr=0;
      var indexYear=header.indexOf("Year");
      var indexDesc=header.indexOf("Description");
      for (j = 0; j < theft.length; j++)
      {
        if(line[indexYear]===theft[j].year)
        {
          theft[j].over$500=parseFloat(theft[j].over$500)+1;
          ctr++;
          break;
        }
      }
      if(ctr==0)
      {
        theft.push({"year":line[indexYear],"over$500":1,"under$500":0});
      }
    }
    else  if(line[header.indexOf("Description")]==="$500 AND UNDER")
    {var ctr=0;
      var indexYear=header.indexOf("Year");
      var indexDesc=header.indexOf("Description");
      for (j = 0; j < theft.length; j++)
      {
        if(line[indexYear]===theft[j].year)
        {
          (theft[j].under$500)++;
          ctr++;
          break;
        }
      }
      if(ctr==0)
      {
        theft.push({"year":line[indexYear],"over$500":1,"under$500":1});
      }
    }
    return theft;
  }


//second JSON
  function filter2(line)
  {
    var indexYear=header.indexOf("Year");
    var indexDesc=header.indexOf("Primary Type");
    var indexArrest=header.indexOf("Arrest");

    if(line[header.indexOf("Primary Type")]==="ASSAULT")
    {var ctr=0;
      for (j = 0; j < assault.length; j++)
      {
        if(line[indexYear]===assault[j].year)
        {
          if(line[indexArrest]==="true")
          {
            assault[j].arrest=parseFloat(assault[j].arrest)+1;
            ctr++;
            break;
          }
          else{
            assault[j].noarrest=parseFloat(assault[j].noarrest)+1;
            ctr++;
            break;
          }
        }
      }
      if(ctr==0)
      {
        if(line[indexArrest]==="true")
        {
          assault.push({"year":line[indexYear],"arrest":1,"noarrest":0});
        }
        else{
          assault.push({"year":line[indexYear],"arrest":0,"noarrest":1});
        }
      }
      return assault;
    }

    // var types=[
    //   {"type":"Index Crimes","crimes":["HOMICIDE","MOTOR VEHICLE THEFT","NON-CRIMINAL","HUMAN TRAFFICKING"]},
    //   {"type":"Non Index Crimes","crimes":["OTHER NARCOTIC VIOLATION","OBSCENITY","CONCEALED CARRY LICENSE VIOLATION","PROSTITUTION","INTERFERENCE WITH PUBLIC OFFICER","INTIMIDATION","LIQUOR LAW VIOLATION","CRIMINAL TRESPASS","KIDNAPPING","GAMBLING","STALKING","PUBLIC PEACE VIOLATION","ARSON","WEAPONS VIOLATION","NARCOTICS","OTHER OFFENSE"]},
    //   {"type":"Violent Crime","crimes":["PUBLIC INDECENCY","SEX OFFENSE","OFFENSE INVOLVING CHILDREN","ASSAULT","BATTERY","CRIM SEXUAL ASSAULT"]},
    //   {"type":"Property Crime","crimes":["ROBBERY","THEFT","CRIMINAL DAMAGE","DECEPTIVE PRACTICE"]}
    // ];
    typeOfCrime=[{"type":"Index Crimes","value":0},{"type":"Non Index Crimes","value":0},{"type":"Violent Crime","value":0},{"type":"Property Crime","value":0}];


//third JSON
    function filter3(line)
    {
      var indexOfType=header.indexOf("Primary Type");
      var indexOfYear=header.indexOf("Year");
      if(line[indexOfYear]==2015)
      {
        if(line[indexOfType]==="HOMICIDE"||line[indexOfType]==="MOTOR VEHICLE THEFT"||line[indexOfType]==="NON-CRIMINAL"||line[indexOfType]==="HUMAN TRAFFICKING")
        {
          (typeOfCrime[0].value)++;
        }
        else if(line[indexOfType]==="PUBLIC INDECENCY"||line[indexOfType]==="SEX OFFENSE"||line[indexOfType]==="OFFENSE INVOLVING CHILDREN"||line[indexOfType]==="ASSAULT"||line[indexOfType]==="BATTERY"||line[indexOfType]==="CRIM SEXUAL ASSAULT")
        {
          (typeOfCrime[2].value)++;
        }
        else if(line[indexOfType]==="ROBBERY"||line[indexOfType]==="THEFT"||line[indexOfType]==="CRIMINAL DAMAGE"||line[indexOfType]==="DECEPTIVE PRACTICE")
        {
          (typeOfCrime[3].value)++;
        }

        else if(line[indexOfType]==="OTHER NARCOTIC VIOLATION"||line[indexOfType]==="OBSCENITY"||line[indexOfType]==="CONCEALED CARRY LICENSE VIOLATION"||line[indexOfType]==="PROSTITUTION"||line[indexOfType]==="INTERFERENCE WITH PUBLIC OFFICER"||line[indexOfType]==="INTIMIDATION"||line[indexOfType]==="LIQUOR LAW VIOLATION"||line[indexOfType]==="CRIMINAL TRESPASS","KIDNAPPING"||line[indexOfType]==="GAMBLING"||line[indexOfType]==="STALKING"||line[indexOfType]==="PUBLIC PEACE VIOLATION"||line[indexOfType]==="ARSON"||line[indexOfType]==="WEAPONS VIOLATION"||line[indexOfType]==="NARCOTICS"||line[indexOfType]==="OTHER OFFENSE")
        {
          (typeOfCrime[1].value)++;
        }
      }
      return typeOfCrime;
    }
