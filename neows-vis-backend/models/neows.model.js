const db = require("./db");

function Neows(){
    this.getWeek = function(callback){
        db.query("SELECT * FROM `neows` WHERE `approach_date` between date_sub(now(),INTERVAL 1 WEEK) and now()", (err,res) => {
        
        if (err) {
          console.log("error:", err);
          callback(err, null);
          return;
        }
        console.log(res);
        callback(null, res);
      });
    }

}

module.exports = Neows;
