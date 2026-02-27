const reels = [
  {
    username: "tech_guru",
    likeCount: 1520,
    isLiked: false,
    commentCount: 45,
    caption: "Leveling up my coding game! 💻🔥",
    video: "./reels/video1.mp4",
    userProfile: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shareCount: 12,
    isFollowed: true
  },
  {
    username: "fit_rider",
    likeCount: 987,
    isLiked: true,
    commentCount: 30,
    caption: "Morning ride hits different 🚴‍♂️🌄",
    video: "./reels/video2.mp4",
    userProfile: "https://example.com/profiles/fit_rider.jpg",
    shareCount: 8,
    isFollowed: false
  },
  {
    username: "travel_buddy",
    likeCount: 2300,
    isLiked: false,
    commentCount: 110,
    caption: "Golden hour in Manali ✨🏔️",
    video: "./reels/video3.mp4",
    userProfile: "https://example.com/profiles/travel_buddy.jpg",
    shareCount: 40,
    isFollowed: true
  },
  {
    username: "chef_magic",
    likeCount: 350,
    isLiked: false,
    commentCount: 15,
    caption: "Quick pasta recipe 🍝✨",
    video: "./reels/video4.mp4",
    userProfile: "https://example.com/profiles/chef_magic.jpg",
    shareCount: 5,
    isFollowed: false
  },
  {
    username: "dance_vibes",
    likeCount: 7800,
    isLiked: true,
    commentCount: 260,
    caption: "Trying this new trend 🔥🕺",
    video: "./reels/video5.mp4",
    userProfile: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D",
    shareCount: 300,
    isFollowed: true
  }
];
var allReels = document.querySelector('.all-reels')

function addData(){
  var sum = ''
reels.forEach(function (elem, idx) {
 
    sum = sum + `<div class="reel">
          <video autoplay loop muted src="${elem.video}"></video>
          <div class="bottom">
            <div class="user">
              <img
                src="${elem.userProfile}"
                alt="">
              <h4>${elem.username}</h4>
              <button>${elem.isFollowed?'Unfollow':'Follow'}</button>
            </div>
            <h3>${elem.caption}</h3>
          </div>
          <div class="right">
            <div class="like">
              <h4 id="like-${idx}" class="like-icon icon">${elem.isLiked?'<i class="love fa-solid fa-heart"></i>':'<i class="fa-regular fa-heart"></i> '}</h4>
              <h6>${elem.likeCount}</h6>
            </div>
            <div class="comment">
              <h4 class="comment-icon icon"><i class="fa-regular fa-comment"></i>
</h4>
              <h6>${elem.commentCount}</h6>
            </div>
            <div class="share">
              <h4 class="share-icon icon"><i class="fa-solid fa-share"></i>
</h4>
              <h6>${elem.shareCount}</h6>
            </div>
            <div class="menu">
              <h4 class="menu-icon icon"><i class="ri-more-2-fill"></i></h4>
            </div>
          </div>
        </div>`

    
})
    allReels.innerHTML = sum
}

addData()

allReels.addEventListener('click', function(dets){
 reels[dets.target.id].likeCount++

addData()

})







