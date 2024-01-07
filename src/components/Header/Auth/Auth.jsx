import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Auth.module.css';
// import login from './img/login.svg';
import { ReactComponent as LoginIcon } from './img/login.svg';
import { urlAuth } from '../../../api/auth';
import Text from '../../../UI/Text';
import { URL_API } from '../../../api/const'

export const Auth = ({ token }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (!token) return;
    console.log(`token:`, token);

    // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
    // API requests with a bearer token should be made to https://oauth.reddit.com, NOT www.reddit.com.
    fetch(`${URL_API}/api/v1/me`, {// https://www.reddit.com/dev/api/#GET_api_v1_me
      headers: {
        Authorization: `bearer ${token}`, // https://github.com/reddit-archive/reddit/wiki/OAuth2#authorization-implicit-grant-flow
      },
    })
      .then(resp => {
        console.log(`----------resp:`, resp);
        return resp.json();
      })
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.split('&')[0];
        console.log(`iconImg, name:`, img, name, iconImg);
        setAuth({ name, img });
      })
      .catch((err) => {
        console.error(err);
        setAuth({});
      });
  }, [token]);

  return (
    <div className={style.container}>
      {auth.name ? (
        // <p>{auth.name}/{auth.img}</p> 
        <button className={style.btn}>
          <img className={style.img} src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} />
        </button>
      ) :
        (
          <Text As='a' href={urlAuth}
            className={style.authLink}
          >
            <LoginIcon width={128} height={128} />
          </Text>
        )
      }
    </div>
  );
};
Auth.propTypes = {
  token: PropTypes.string,
};
/*
icon_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc-headshot.png"
name: "Intelligent_Beach415"

is_employee: false, 
seen_layout_switch: false, 
has_visited_new_profile: false, 
pref_no_profanity: true, 
has_external_account: false, …}
accept_followers: trueawardee_karma: 0awarder_karma: 0can_create_subreddit: truecan_edit_name: falsecoins: 0comment_karma: 0created: 1704653022created_utc: 1704653022features: {modmail_harassment_filter: true, mod_service_mute_writes: true, promoted_trend_blanks: true, show_amp_link: true, chat: true, …}force_password_reset: falsegold_creddits: 0gold_expiration: nullhas_android_subscription: falsehas_external_account: falsehas_gold_subscription: falsehas_ios_subscription: falsehas_paypal_subscription: falsehas_stripe_subscription: falsehas_subscribed: truehas_subscribed_to_premium: falsehas_verified_email: truehas_visited_new_profile: falsehide_from_robots: falseicon_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc-headshot.png"id: "7wr3778yp"in_beta: falsein_redesign_beta: trueinbox_count: 0is_employee: falseis_gold: falseis_mod: falseis_sponsor: falseis_suspended: falselink_karma: 1linked_identities: []name: "Intelligent_Beach415"num_friends: 0oauth_client_id: "o3eE_EEZoM8PbDmaCLzBig"over_18: falsepassword_set: truepref_autoplay: truepref_clickgadget: 5pref_geopopular: ""pref_nightmode: falsepref_no_profanity: truepref_show_presence: truepref_show_snoovatar: falsepref_show_trending: truepref_show_twitter: falsepref_top_karma_subreddits: truepref_video_autoplay: trueseen_give_award_tooltip: falseseen_layout_switch: falseseen_premium_adblock_modal: falseseen_redesign_modal: falseseen_subreddit_chat_ftux: falsesnoovatar_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc.png"snoovatar_size: (2) [380, 600]subreddit: {default_set: true, user_is_contributor: false, banner_img: '', restrict_posting: true, user_is_banned: false, …}suspension_expiration_utc: nulltotal_karma: 1verified: true[[Prototype]]: Object

*/
