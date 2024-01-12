import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
// import { URL_API } from '../../../api/const'
import {urlAuth} from '../../../api/auth';
import Text from '../../../UI/Text';
import {ReactComponent as LoginIcon} from './img/login.svg';
import style from './Auth.module.css';
import Logout from './Logout';
// import { useAuth } from '../../../hooks/useAuth';
import {authContext} from '../../../context/index';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store';

export const Auth = () => {
  // const [auth, clearAuth] = useAuth();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const {auth, clearAuth} = useContext(authContext);
  // const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(deleteToken()); // delToken();
    clearAuth();
  };

  return (
    <div className={style.container}>
      {auth.name ? (
        <>
          <button className={style.btn}
            onClick={() => {
              setLogoutVisible((prev) => !prev);
            }}
          >
            <img className={style.img} src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} />
          </button>
          {logoutVisible && <Logout logout={handleLogout} />
          }
        </>
      ) : (
        <Text As='a' href={urlAuth}
          className={style.authLink}
        >
          <LoginIcon width={128} height={128} />
        </Text>
      )}
    </div>
  );
};
Auth.propTypes = {
  token: PropTypes.string,
};
/*
icon_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc-headshot.png"
name: "Intelligent_Beach415"

is_employee: false  ,
seen_layout_switch: false  ,
has_visited_new_profile: false  ,
pref_no_profanity: true ,
has_external_account: false  ,…}
accept_followers: true awardee_karma: 0
awarder_karma: 0
can_create_subreddit: true
can_edit_name: false
coins: 0comment_karma: 0
created: 1704653022
created_utc: 1704653022
features: {modmail_harassment_filter: true , mod_service_mute_writes: true , promoted_trend_blanks: true ,
  show_amp_link: true , chat: true ,…}
force_password_reset: false gold_creddits: 0gold_expiration: nullhas_android_subscription: false
has_external_account: false
has_gold_subscription: false
has_ios_subscription: false
has_paypal_subscription: false
has_stripe_subscription: false
has_subscribed: true
has_subscribed_to_premium: false
has_verified_email: true has_visited_new_profile: false
hide_from_robots: false
icon_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc-headshot.png"
id: "7wr3778yp"
in_beta: false
 in_redesign_beta: true
 inbox_count: 0
 is_employee: false
 is_gold: false is_mod: false is_sponsor: false is_suspended: false
 link_karma: 1linked_identities: []
 name: "Intelligent_Beach415"
 num_friends: 0 oauth_client_id: "o3eE_EEZoM8PbDmaCLzBig"
 over_18: false password_set: true pref_autoplay: true pref_clickgadget: 5
 pref_geopopular: ""
 pref_nightmode: false pref_no_profanity: true pref_show_presence: true pref_show_snoovatar: false
 pref_show_trending: true pref_show_twitter: false
 pref_top_karma_subreddits: true pref_video_autoplay: true seen_give_award_tooltip: false
 seen_layout_switch: false seen_premium_adblock_modal: false seen_redesign_modal: false
 seen_subreddit_chat_ftux: false
 snoovatar_img: "https://i.redd.it/snoovatar/avatars/cc17dec7-7811-44d5-87aa-c2b29c7dc9cc.png"
snoovatar_size: (2)[380, 600]
subreddit: {default_set: true , user_is_contributor: false  , banner_img: '',
restrict_posting: true , user_is_banned: false  ,}
suspension_expiration_utc: nulltotal_karma: 1verified: true [[Prototype]]: Object
*/
