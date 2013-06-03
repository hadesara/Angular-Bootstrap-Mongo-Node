module.exports = {
  index: function(req, res) {
    console.log(currentDir + '/client/views/index');
    res.render(currentDir + '/client/views/index');
  },
  partials: function (req, res) {
    var name = req.params.name;
    if(req.params.folderName)
    {
    	var folderName = req.params.folderName;
    	res.render(currentDir + '/client/views/partials/' + folderName + '/' + name );
    }
    else
    {
    	res.render(currentDir + '/client/views/partials/' + name);
    }
  }
};
  