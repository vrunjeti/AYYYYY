var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var cors       = require('cors');
var Project    = require('./models/project');

mongoose.connect('mongodb://teamayyyyy:hoorayyyyy@ds047782.mongolab.com:47782/ayyyyy');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;

// Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

// log requests to console
app.use(morgan('dev'));

// ROUTES ----------------------------------------------------------------
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

var projectRoute = router.route('/projects');

// GET all projects
projectRoute.get(function(req, res){
  Project.find(function(err, project){
    if(err) {
      res.send(err);
    }
    res.json(project);
  });
});

// POST (create) a new project
projectRoute.post(function(req, res){
  var project = new Project();
  project.name = req.body.name;
  project.location = req.body.location;
  project.description = req.body.description;
  project.participants = [];
  project.images = req.body.images;
  project.category = req.body.category;
  project.status = req.body.status || 'Status unavailable';

  project.save(function(err){
    if(err) {
      res.send(err);
    }
    res.json({
      message: 'Project successfully created',
      data: project
    });
  });
});

var singleProjectRoute = router.route('/projects/:id');

singleProjectRoute.get(function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err) {
      res.send(err);
    }
    res.json(project);
  });
});

singleProjectRoute.put(function(req, res){
  Project.findById(req.params.id, function(err, project){
    if(err) {
      res.send(err);
    }
    // update with new data
    project.name = req.body.name;
    project.location = req.body.location;
    project.description = req.body.description;
    project.participants = req.body.participants;
    project.images = req.body.images;
    project.category = req.body.category;
    project.status = req.body.status || 'Status unavailable';

    project.save(function(err){
      if(err) {
        res.send(err);
      }
      res.json({
        message: 'Project successfully updated!',
        data: project
      });
    });
  });
});

singleProjectRoute.delete(function(req, res){
  Project.remove({
    _id: req.params.id
  }, function(err, project){
    if(err) {
      res.send(err);
    }
    res.json({
      message: 'Project successfully deleted!',
    });
  });
});

var addParticipantRoute = router.route('/addparticipant');

addParticipantRoute.put(function(req, res){
  Project.findByIdAndUpdate(
    req.body.id,
    {
      $push: {
        'participants': req.body.participant
      }
    },
    function(err, project){
      if(err) {
        res.send(err);
      }
      res.json({
        message: 'Participant ' + req.body.participant + ' successfully added!',
        data: project
      });
  });
});

app.use('/api', router);

app.listen(port);
console.log('Server started on port ' + port);