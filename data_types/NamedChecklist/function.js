function(ellipsis) {
  const savedChecklists = require('savedChecklists')(ellipsis);

savedChecklists.getMyChecklists().then(ellipsis.success);
}
