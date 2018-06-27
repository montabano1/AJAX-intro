const FollowToggle = require('./follow_toggle');
const APIUtil = require('./api_util');
const UsersSearch = require('./users_search');

const usersSearchCB = function () {
  $('nav.users-search').each((idx, search) => {
    new UsersSearch(search);
  });
  
  $('nav.users-search').on('keypress', (e) => {
    APIUtil.searchUsers(e.$input, () => {
      
    });
    
  });
};

const followToggleCB = function () {
  $('.follow-toggle').each((idx,toggle) => {
    new FollowToggle(toggle);
  });
  
  $('.follow-toggle').on('click', (e) => {
    e.preventDefault();
    if ($(e.currentTarget).context.dataset.followState === 'unfollowed') {
      APIUtil.followUser($(e.currentTarget).context.dataset.userId).then($(e.currentTarget).context.dataset.followState = 'followed');
    } else {
      APIUtil.unfollowUser($(e.currentTarget).context.dataset.userId).then($(e.currentTarget).context.dataset.followState = 'unfollowed');
    }
    FollowToggle.prototype.render($(e.currentTarget));
  });
};

$( () => {
  followToggleCB();
  usersSearchCB();
});