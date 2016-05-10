const readline = require('readline');
const fs = require('fs');
var arr=[];
var i=-1;
var newarr=[];
const rl = readline.createInterface({
  input: fs.createReadStream('Indicators.csv')
});
rl.on('line',function (line){

  arr=(line.match(/(?:"[^"]*"|[^,])+/g));

  var result=filter(arr);
  //var result1=filter1(arr);
  var result2=filter2(arr);

}).on('close',function(){
  //console.log(result1);
   fs.writeFile('lifeExpectancy1.json',JSON.stringify(result, null, ' '));
  // fs.writeFile('BirthAndDeath.json',JSON.stringify(result1, null, ' '));
//  fs.writeFile('Total.json',((result2.sort(function(p1, p2) { return p2.LifeExp - p1.LifeExp; })).slice(0, 5),null,' '));
//fs.writeFile('Total.json',JSON.stringify(((result2.sort(function(p1, p2) { return p2.LifeExp - p1.LifeExp; })).slice(0, 5)),null,' '));

});




var val=0.0;
var country=["Bangladesh","Bhutan","Brunei","Myanmar","Cambodia","China","India","Indonesia","Iran"];
result=[],result1=[],result2=[];


function filter(line){
  if(country.indexOf(line[0])!==-1)
  {
    if(line[3]==="SP.DYN.LE00.FE.IN")
    {
      var ctr=0;
      for(j=0;j<result.length ;j++)
      {
        if(result[j].country===line[0])
        {
          result[j].Female=parseFloat(result[j].Female)+parseFloat(line[5]);
          ctr++;
          break;
        }
      }
      if(ctr===0)
      {
        result.push({country:line[0],Female:line[5],Male:0});
      }

    }
    else if(line[3]==="SP.DYN.LE00.MA.IN"){
      var ctr=0;
      for(j=0;j<result.length ;j++)
      {
        if(result[j].country===line[0])
        {
          result[j].Male=parseFloat(result[j].Male)+parseFloat(line[5]);
          ctr++;
          break;
        }
      }
      if(ctr===0)
      {
        result.push({country:line[0],Female:0,Male:line[5]});
      }

    }

  }
  return JSON.stringify(result);
}


function filter1(line)
{

  if(line[0]==="India")
  {
    if(line[3]==="SP.DYN.CBRT.IN")
    {
      var ctr=0;
      for(j=0;j<result1.length ;j++)
      {
        if(result1[j].year===line[4])
        {
          result1[j].BirthRate=parseFloat(line[5]);
          ctr++;
          break;
        }
      }
      if(ctr===0)
      {
        result1.push({year:line[4],BirthRate:parseFloat(line[5])});
      }

    }
    else if(line[3]==="SP.DYN.CDRT.IN"){
      var ctr=0;
      for(j=0;j<result1.length ;j++)
      {
        if(result1[j].year===line[4])
        {
          result1[j].DeathRate=parseFloat(line[5]);
          ctr++;
          break;
        }
      }
      if(ctr===0)
      {
        result1.push({year:line[4],DeathRate:parseFloat(line[5])});
      }

    }

  }
  return JSON.stringify(result1);
}


function filter2(line)
{
  if(line[3]==="SP.DYN.LE00.IN")
  {
    var ctr=0;
    for(j=0;j<result2.length ;j++)
    {
      if(result2[j].country===line[0])
      {
        result2[j].LifeExp=result2[j].LifeExp+parseFloat(line[5]);
        ctr++;
        break;
      }
    }
    if(ctr===0)
    {
      result2.push({country:line[0],LifeExp:parseFloat(line[5])});
    }

  }

return result2;
}
