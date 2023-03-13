const mysql = require("mysql");

// sql con#
const pool = mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

// View
exports.view = (req,res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log("connected as ID" + connection.threadId);
    

    connection.query("SELECT id,image_name FROM sheet1",(err,rows) =>{
        // when con is done 
        connection.release();

        if(!err){
            res.render("index", {rows});
        }
        else{
            console.log(err);
        }

    });

    });

}


     // gets id for info page
    exports.get = (req,res) =>{

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log("connected as ID" + connection.threadId);

            var id = req.params.id;

        connection.query("SELECT * FROM sheet1 WHERE id = ?",[id],(err,rows) =>{
            // when con is done 
            connection.release();
    
            if(!err){
                res.render("infoPage", {rows});
            }
            else{
                console.log(err);
            }
    
        });
    });

    }

     // Next 
    exports.next = (req,res) =>{

        var {pid,type,notes} = req.body;

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log("connected as ID" + connection.threadId);


        connection.query("UPDATE sheet1 SET type = ?, note = ? WHERE id = ?",[type,notes,pid],(err,rows) =>{
            // when con is done 
            connection.release();
    
            if(!err){
                pool.getConnection((err, connection) => {
                    if(err) throw err;
                    console.log("connected as ID" + connection.threadId);
        
                 id = parseInt(pid) + 1;

                connection.query("SELECT * FROM sheet1 WHERE id = ?",[id],(err,rows,fields) =>{
                    // when con is done 
                    //connection.release();
                    console.log(rows);
            
                    if(!err){
                        // last record val goes here
                        if(!rows.length){
                           console.log("error");
                           // just get the last image again 
                           connection.query("SELECT * FROM sheet1 WHERE id = ?",[pid],(err,rows) =>{
                            // when con is done 
                            connection.release();
                    
                            if(!err){
                                res.render("infoPage", {rows});
                            }
                            else{
                                console.log(err);
                            }
                    
                        });
                           
                        }
                        else{
                          res.render("infoPage", {rows});
                          console.log(rows);
                        }
                    }
                    else{
                        console.log(err);
                    }
                    
            
                });
            });
              
            }
            else{
                console.log(err);
            }
    
        });
    });

    }

    exports.pre = (req,res) =>{
        var {pid,type,notes} = req.body;

        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log("connected as ID" + connection.threadId);


        connection.query("UPDATE sheet1 SET type = ?, note = ? WHERE id = ?",[type,notes,pid],(err,rows) =>{
            // when con is done 
            connection.release();
    
            if(!err){
                pool.getConnection((err, connection) => {
                    if(err) throw err;
                    console.log("connected as ID" + connection.threadId);
        
                 id = parseInt(pid) - 1;

                 if(id < 1){
                    id = 1;
                 }

                connection.query("SELECT * FROM sheet1 WHERE id = ?",[id],(err,rows) =>{
                    // when con is done 
                    connection.release();
            
                    if(!err){
                        res.render("infoPage", {rows});
                        console.log(rows);
                    }
                    else{
                        console.log(err);
                    }
            
                });
            });
              
            }
            else{
                console.log(err);
            }
    
        });
    });



    }
    




