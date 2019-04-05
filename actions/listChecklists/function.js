function(ellipsis) {
  const savedChecklists = require('savedChecklists')(ellipsis);

savedChecklists.getMyChecklists().then(lists => {
  const withEditLinks = lists.map(ea => {
    return Object.assign({}, ea, { editLink: `${ellipsis.apiBaseUrl}/edit_skill/${ea.id}` });
  });
  ellipsis.success(withEditLinks);
});
}
