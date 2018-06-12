var express = require ('express');
var app = express();
var mongojs = require ('mongojs');
var bodyParser = require ('body-parser');
var db = mongojs('task', ['companies']);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/companies', function (req,res){
	db.companies.find(function (err, docs) {
    res.json(docs);
  });
});

app.get('/tests', function (req,res){
	db.tests.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/user', function (req,res){
	db.users.findOne({username: req.body.username, password: req.body.password},function(err,doc){
		res.json(doc);
	});
});

app.post('/test/range', function (req,res){
	db.tests.find({ createdOn: {
		$gte: new Date(req.body.start),
        $lt: new Date(req.body.end),
    }}, function(err,doc){
		res.json(doc);
	});
});

app.get('/company/:id', function (req,res){
	var id = req.params.id;
	db.companies.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.get('/employee/:id', function (req,res){
	var id = req.params.id;
	db.employees.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
	
app.post('/add/company', function (req,res){	
	db.companies.insert(req.body, function(err,doc){
		res.json(doc);
	})
});

app.post('/add/employee', function (req,res){	
	db.employees.insert(req.body, function(err,doc){
		res.json(doc);
	})
});

app.post('/add/test', function (req,res){
	var currentTime = new Date();
	db.tests.insert({name: req.body.name, result: req.body.result, employee: req.body.employee, createdOn: currentTime}, function(err,doc){
		res.json(doc);
	})
}); 

app.delete('/company/:id', function (req,res){
	var id = req.params.id;
	db.companies.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
});

app.delete('/employee/:id', function (req,res){
	var id = req.params.id;
	db.employees.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
});

app.delete('/test/:id', function (req,res){
	var id = req.params.id;
	db.tests.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	})
});

app.put('/company/:id', function (req,res){
	var id = req.params.id;
	db.companies.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
	update: {$set: {name: req.body.name, city: req.body.city, number:req.body.number}},
	new: true},
	function(err,doc){
		res.json(doc);
	});	
});

app.put('/employee/:id', function (req,res){
	var id = req.params.id;
	db.employees.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
	update: {$set: {firstname: req.body.firstname, lastname: req.body.lastname, city: req.body.city, number:req.body.number}},
	new: true},
	function(err,doc){
		res.json(doc);
	});	
});

app.put('/test/:id', function (req,res){
	var id = req.params.id;
	db.tests.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
	update: {$set: {result:req.body.result}},
	new: true},
	function(err,doc){
		res.json(doc);
	});
});

app.get('/company/employees/:id', function (req,res){
	var id = req.params.id;
	db.employees.find({company: id}, function (err, docs) {
    res.json(docs);
	});
});
	
 app.get('/company/pass/:id', function (req,res){
	var id = req.params.id;
	/* var a = db.employees.find({company: id},{ _id: 1 }), function (err, docs) {
		db.tests.find({employee: docs[0]._id}, function (err, doc) {		
		console.log(doc);
    res.json(docs);
	});
	console.log(a); 
	});*/
});
 
app.get('/employee/tests/:id', function (req,res){
	var id = req.params.id;
	db.tests.find({employee: id}, function (err, docs) {
    res.json(docs);
	});
});
	
app.get('/employee/company/:id', function (req,res){
	var id = req.params.id;
	db.employees.findOne({_id: mongojs.ObjectId(id)}, function (err, docs) {
		db.companies.findOne({_id: mongojs.ObjectId(docs.company)}, function (err, doc) {
			res.json(doc);
		});
	});
});

app.listen(3000);
console.log("hey from port 3000");