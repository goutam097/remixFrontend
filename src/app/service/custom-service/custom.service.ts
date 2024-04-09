import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { StaticStorageService } from '../local-storage/static-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  constructor(
    private staticData: StaticStorageService,
    private dataServ: DataService,
  ) { }

  async likeDislike(postId: any,sessionUserId: any, emoji_type: string = 'bless'){
    const jsonData = {
      postId: postId,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/post/generate-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let postDetails = res?.data || {}
          if(postDetails){
            postDetails.likedByMe = sessionUserId && postDetails?.likeFriendsArray ? postDetails?.likeFriendsArray?.some((likeFriend: any) => likeFriend.friendId == sessionUserId) : false;
            const likeType = sessionUserId
                ? postDetails?.likeFriendsArray?.find(
                    (likeFriend: any) => likeFriend.friendId == sessionUserId
                  )
                : '';
            postDetails.myLikeType = likeType && likeType.emoji_type ? likeType.emoji_type : ''
            postDetails.likeFriendHtml = this.getLikeFriendHtml(postDetails?.likeFriendsArray,postDetails?.likedByMe,sessionUserId);
          }
          return postDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async addNewComment(parentId: any, postId: any, caption: any){
    if(caption.endsWith('\n')){
      caption = caption.replace(new RegExp(`\n$`, 'i'), '');
    }
    const jsonData = {
      post_id: postId,
      caption: caption
    }
    
    if(parentId)
      Object.assign(jsonData, {parent_id: parentId})

    return await this.dataServ.postMethodWithToken(jsonData, `/post/generate-comment`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let postDetails = res?.data || {}
          postDetails.postId = postId
          return postDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  getLikeFriendHtml(likeFriends: any, likedByMe: boolean, sessionUserId: any){
    let html = ""
    if(likeFriends.length == 1){
      if(likedByMe){
        html = `<span><strong>You</strong></span>`
      }else{
        html = `<span><b>${likeFriends[0].friendName.split(" ")[0]}</b></span>`
      }
    }else if(likeFriends.length == 2){
      if(likedByMe){
        const othersLikeFriend = this.othersFriend(likeFriends, sessionUserId)
        html = `<span><strong>You</strong> and <b>${othersLikeFriend[0].friendName.split(" ")[0]}</b></span>`
      }else{
        html = `<span><b>${likeFriends[0].friendName.split(" ")[0]}</b> and <b>${likeFriends[1].friendName.split(" ")[0]}</b></span>`
      }
    }else if(likeFriends.length > 2){
      if(likedByMe){
        const othersLikeFriend = this.othersFriend(likeFriends, sessionUserId)
        html = `<span><strong>You</strong>, <b>${othersLikeFriend[0].friendName.split(" ")[0]}</b> and ${likeFriends.length - 2} more</span>`
      }else{
        html = `<span><b>${likeFriends[0].friendName.split(" ")[0]}</b>, <b>${likeFriends[1].friendName.split(" ")[0]}</b> and ${likeFriends.length - 2} more</span>`
      }
    }
    return html;
  } 

  getTagFriendHtml(tagFriends: any, authorName: any, location: any, title?: any){
    let html = ""
    if(title && title != ''){
      html += `<span> ${title}</span>`
    }else{
      if(tagFriends.length == 1){
        html += ` With <a (click)="gotoFriendDetails('${tagFriends[0].slug}','user-timeline')"> <strong>${tagFriends[0].friendName.split(" ")[0]}</strong></a>`
      }else if(tagFriends.length == 2){
        html += ` With <a (click)="gotoFriendDetails('${tagFriends[0].slug}','user-timeline')"><strong> ${tagFriends[0].friendName.split(" ")[0]}</strong></a> and<a (click)="gotoFriendDetails('${tagFriends[1].slug}','user-timeline')"><strong> ${tagFriends[1].friendName.split(" ")[0]}</strong></a>`
      }else if(tagFriends.length > 2){
        html += ` With <a (click)="gotoFriendDetails('${tagFriends[0].slug}','user-timeline')"><strong> ${tagFriends[0].friendName.split(" ")[0]}</strong></a>,<a (click)="gotoFriendDetails('${tagFriends[1].slug}','user-timeline')"><strong> ${tagFriends[1].friendName.split(" ")[0]}</strong></a> and ${tagFriends.length-2} others`
      }
    }

    if(location){
      html += ` at <a title=${location}><strong>${location}</strong></a>`
    }
    return html;
  }

  othersFriend(friends: any, sessionUserId: any){
    return friends.filter(
      (friend: any) => friend.friendId != sessionUserId
    );
  }

  async commentLikeDislike(commentId: any, emoji_type: string = 'bless'){
    const jsonData = {
      commentId: commentId,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/post/generate-comment-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          return res?.data || {}
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async prayerLikeDislike(prayerId: any,sessionUserId: any, emoji_type: string = 'bless'){
    const jsonData = {
      prayerId: prayerId,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/prayer/generate-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let prayerDetails = res?.data || {}
          if(prayerDetails){
            prayerDetails.likedByMe = sessionUserId && prayerDetails?.likeFriendsArray ? prayerDetails?.likeFriendsArray?.some((likeFriend: any) => likeFriend.friendId == sessionUserId) : false;
            const likeType = sessionUserId
                ? prayerDetails?.likeFriendsArray?.find(
                    (likeFriend: any) => likeFriend.friendId == sessionUserId
                  )
                : '';
            prayerDetails.myLikeType = likeType && likeType.emoji_type ? likeType.emoji_type : ''
            prayerDetails.likeFriendHtml = this.getLikeFriendHtml(prayerDetails?.likeFriendsArray,prayerDetails?.likedByMe,sessionUserId);
          }
          return prayerDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async prayerAddNewComment(parentId: any, prayer_id: any, caption: any){
    if(caption.endsWith('\n')){
      caption = caption.replace(new RegExp(`\n$`, 'i'), '');
    }
    const jsonData = {
      prayer_id: prayer_id,
      caption: caption
    }
    
    if(parentId)
      Object.assign(jsonData, {parent_id: parentId})

    return await this.dataServ.postMethodWithToken(jsonData, `/prayer/generate-comment`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let postDetails = res?.data || {}
          postDetails.prayer_id = prayer_id
          return postDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async prayerCommentLikeDislike(commentId: any, emoji_type: string = 'bless'){
    const jsonData = {
      commentId: commentId,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/prayer/generate-comment-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          return res?.data || {}
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async newsLikeDislike(news_id: any,sessionUserId: any, emoji_type: string = 'bless'){
    const jsonData = {
      news_id: news_id,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/news/generate-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let postDetails = res?.data || {}
          if(postDetails){
            postDetails.likedByMe = sessionUserId && postDetails?.likeFriendsArray ? postDetails?.likeFriendsArray?.some((likeFriend: any) => likeFriend.friendId == sessionUserId) : false;
            const likeType = sessionUserId
                ? postDetails?.likeFriendsArray?.find(
                    (likeFriend: any) => likeFriend.friendId == sessionUserId
                  )
                : '';
            postDetails.myLikeType = likeType && likeType.emoji_type ? likeType.emoji_type : ''
            postDetails.likeFriendHtml = this.getLikeFriendHtml(postDetails?.likeFriendsArray,postDetails?.likedByMe,sessionUserId);
          }
          return postDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async newsAddNewComment(parentId: any, news_id: any, caption: any){
    if(caption.endsWith('\n')){
      caption = caption.replace(new RegExp(`\n$`, 'i'), '');
    }
    const jsonData = {
      news_id: news_id,
      caption: caption
    }
    
    if(parentId)
      Object.assign(jsonData, {parent_id: parentId})

    return await this.dataServ.postMethodWithToken(jsonData, `/news/generate-comment`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          let postDetails = res?.data || {}
          postDetails.news_id = news_id
          return postDetails;
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

  async newsCommentLikeDislike(commentId: any, emoji_type: string = 'bless'){
    const jsonData = {
      commentId: commentId,
      emoji_type: emoji_type
    }
    
    return await this.dataServ.postMethodWithToken(jsonData, `/news/generate-comment-like`, this.staticData.accessToken)
    .then(
      async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.code == 200) {
          return res?.data || {}
        }else{
          return {}
        }
      },
      (err) => {
        console.log(err)
        return {}
      }
    );
  }

}
