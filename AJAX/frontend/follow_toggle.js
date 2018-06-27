class FollowToggle {
  constructor(el) {
    let $el = $(el);
    this.user_id = $el.context.dataset.userId;
    this.followState = $el.context.dataset.followState;
    this.render($el);
  }
  
  render($el) {
    // 
    if ($el.context.dataset.followState === 'unfollowed') {
      $el.text('Follow!');
    } else {
      $el.text('Unfollow!');
    }
  }
  
  handleClick (e) {
    
  }
}


module.exports = FollowToggle;