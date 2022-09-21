const db = require("./db");

function Neows(nasa_id, neos_reference_id, name, approach_date, diameter, magnitude, distance, velocity){
    this.nasa_id = nasa_id;
    this.neos_reference_id = neos_reference_id;
    this.name = name;
    this.approach_date = approach_date;
    this.diameter = diameter;
    this.magnitude = magnitude;
    this.distance = distance;
    this.velocity = velocity;
}

Neows.getDayData = function(day, callback){
    db.query("SELECT * FROM `neows` WHERE `approach_date`=?", day, (err,res) => {
    
    if (err) {
        console.log("error:", err);
        callback(err, null);
        return;
    }
    console.log(res);
    callback(null, res);
    });
};

Neows.insertData = function(nasa_data, callback){
    const table_data = nasa_data.map(el => 
        [   el.id, 
            el.neos_reference_id, 
            el.name, 
            el.close_approach_data[0].close_approach_date,
            (el.estimated_diameter.kilometers.estimated_diameter_min+el.estimated_diameter.kilometers.estimated_diameter_max)/2,
             el.absolute_magnitude_h, 
             el.close_approach_data[0].miss_distance.astronomical, 
             el.close_approach_data[0].relative_velocity.kilometers_per_second
        ]
    );
    db.query("INSERT IGNORE INTO `neows` (nasa_id, neos_reference_id, name, approach_date, diameter, magnitude, distance, velocity) VALUES ?", [table_data], (err,res)=>{
        if (err) {
            console.log("error:", err);
            callback(err, null);
            return;
        }
        console.log(res);
        callback(null, res);
    })

}

module.exports = Neows;
