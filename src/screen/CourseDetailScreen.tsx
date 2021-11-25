import { useEffect } from "react";
import { Textarea } from "../components/Input";
import { CourseActionField } from "../components/Btn/CourseActionField";
import { ProfileCard } from "../components/card/ProfileCard";
import { CourseImage } from "../components/Input/CourseImage";
import { BackHeader } from "../components/BackHeader";
import useSWR from "swr";
import { useParams } from "react-router";
import { API_URL } from "../components/common";
import fetcher from "../hook/useSWR/fetcher";
import { useRecoilState } from "recoil";
import { loadingState, shareModalState } from "../components/recoil";
import { CourseType } from "../types/Course";
import { BottomSheet } from "react-spring-bottom-sheet";
import { GRAY6, GRAY7, SCREEN_HEIGHT, styleCenter } from "../style";
//#region react-share
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import { CItem } from "../components/Input/CommandInput/CItem";
//#endregion

const CourseDetailScreen = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  //#region 스크롤 열기
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: scroll;");
    return () => {
      body.setAttribute("style", "overflow: hidden;");
      setLoading(false);
    };
  }, []);
  //#endregion
  const { id }: { id: string | undefined } = useParams();
  const { data, error } = useSWR(`${API_URL}/courses?id=${id}`, fetcher);
  if ((error || !data) && !loading) setLoading(true);
  if (error)
    return (
      <div>
        <BackHeader />
        failed to load
      </div>
    );
  if (!data)
    return (
      <div>
        <BackHeader />
        {/* loading... */}
      </div>
    );
  if (loading) setLoading(false);

  const course: CourseType = data[0];

  return (
    <>
      <div style={{ position: "fixed" }}>
        <BackHeader />
      </div>
      <CourseArea course={course} />
      <ShareModal url={location.href} course={course} />
    </>
  );
};
//#region ShareModal
const BtnStyle = { width: 64, height: 90, marginRight: 8, marginTop: 2 };
const IconStyle = { borderRadius: 10, ...styleCenter };
const ShareModal = ({ url = "", course }: { url: string; course: CourseType }) => {
  const [modalInfo, setModalInfo] = useRecoilState(shareModalState);
  return (
    <BottomSheet
      // ref={bottomRef}
      blocking={false}
      open={modalInfo.visible}
      onDismiss={() => setModalInfo({ ...modalInfo, visible: false })}
      snapPoints={({ minHeight, maxHeight }) => [
        maxHeight * 0.4 + 30,
        maxHeight * 0.5,
        maxHeight * 0.7,
        maxHeight * 0.9,
      ]}
      defaultSnap={({ lastSnap, snapPoints }) => SCREEN_HEIGHT * 0.4}
      header={
        <div>
          <div style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY7, float: "left" }}>
            코스를 공유해보세요!
          </div>
          <div
            style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: 15, color: GRAY6, float: "right" }}
            onClick={() => setModalInfo({ ...modalInfo, visible: false })}
          >
            닫기
          </div>
        </div>
      }
      expandOnContentDrag={false}
    >
      <div style={{ ...styleCenter, display: "flex", flexFlow: "wrap" }}>
        <EmailShareButton subject={"subject"} body={"body"} url={url} style={BtnStyle}>
          <EmailIcon style={IconStyle} />
          Email
        </EmailShareButton>
        <TwitterShareButton url={url} style={BtnStyle}>
          <TwitterIcon style={IconStyle} />
          Twitter
        </TwitterShareButton>
        <LineShareButton url={url} style={BtnStyle}>
          <LineIcon style={IconStyle} />
          라인
        </LineShareButton>
        <FacebookShareButton url={url} style={BtnStyle} hashtag={"campustaxi"}>
          <FacebookIcon style={IconStyle} />
          Facebook
        </FacebookShareButton>
        <HatenaShareButton url={url} style={BtnStyle} title={"campustaxi"}>
          <HatenaIcon style={IconStyle} />
          Hatena
        </HatenaShareButton>
        <InstapaperShareButton url={url} style={BtnStyle}>
          <InstapaperIcon style={IconStyle} />
          Instapaper
        </InstapaperShareButton>
        <LinkedinShareButton url={url} style={BtnStyle}>
          <LinkedinIcon style={IconStyle} />
          Linkedin
        </LinkedinShareButton>
        <LivejournalShareButton url={url} style={BtnStyle}>
          <LivejournalIcon style={IconStyle} />
          Livejournal
        </LivejournalShareButton>
        <MailruShareButton url={url} style={BtnStyle}>
          <MailruIcon style={IconStyle} />
          Mailru
        </MailruShareButton>
        <OKShareButton url={url} style={BtnStyle}>
          <OKIcon style={IconStyle} />
          OK
        </OKShareButton>
        <PinterestShareButton url={url} style={BtnStyle} media={url}>
          <PinterestIcon style={IconStyle} />
          Pinterest
        </PinterestShareButton>
        <PocketShareButton url={url} style={BtnStyle}>
          <PocketIcon style={IconStyle} />
          Pocket
        </PocketShareButton>
        <RedditShareButton url={url} style={BtnStyle}>
          <RedditIcon style={IconStyle} />
          레딧
        </RedditShareButton>
        <TelegramShareButton url={url} style={BtnStyle}>
          <TelegramIcon style={IconStyle} />
          텔레그램
        </TelegramShareButton>
        <TumblrShareButton url={url} style={BtnStyle}>
          <TumblrIcon style={IconStyle} />
          텀블러
        </TumblrShareButton>
        <ViberShareButton url={url} style={BtnStyle}>
          <ViberIcon style={IconStyle} />
          Viber
        </ViberShareButton>
        <VKShareButton url={url} style={BtnStyle}>
          <VKIcon style={IconStyle} />
          VK
        </VKShareButton>
        <WhatsappShareButton url={url} style={BtnStyle}>
          <WhatsappIcon style={IconStyle} />
          Whatsapp
        </WhatsappShareButton>
        <WorkplaceShareButton url={url} style={BtnStyle}>
          <WorkplaceIcon style={IconStyle} />
          Workplace
        </WorkplaceShareButton>
      </div>
    </BottomSheet>
  );
};
//#endregion

const CourseArea = ({ course }: { course: CourseType }) => {
  return (
    <>
      <CourseImage imgUrl={course && course.images && course.images.length > 0 ? course.images[0].url : ""} />
      <div style={{ padding: "0 16px 80px 16px" }}>
        <div style={{ marginTop: 16 }}>
          <Textarea
            disabled
            defaultValue={course ? (course.title ?? "") : ""}
            style={{
              border: "none",
              width: "100%",
              fontSize: 19,
              paddingRight: 6,
              padding: 2,
              fontFamily: "AppleSDGothic",
              backgroundColor: "transparent",
              resize: "none",
              outline: "none",
            }}
          />
          <div style={{ marginTop: 12 }}>
            <Textarea
              disabled
              defaultValue={course ? (course.description ?? "") : ""}
              style={{
                border: "none",
                width: "100%",
                fontSize: 15,
                paddingRight: 6,
                fontFamily: "AppleSDGothic",
                backgroundColor: "transparent",
                resize: "none",
                overflow: "hidden",
                outline: "none",
              }}
            />
          </div>
          <CourseActionField />
          <ProfileCard address={course && course.creator_id ?course.creator_id.nickname:""} title={course && course.creator_id ? course.creator_id.email: ""} desc={`팔로워 ${course && course.creator_id ? course.creator_id.follower : 0}`} img={course && course.creator_id ? course.creator_id.profile_image: ""} />
          <CommandArea content={JSON.parse(course.content)} />
        </div>
      </div>
    </>
  );
};

const CommandArea = ({ content }: { content: CourseType[] }) => {
  return (
    <div>
      {content.map((item: any, i: number) => {
        return (
          <div key={i.toString()}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyItems: "center",
                marginTop: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  height: 10,
                }}
              ></div>
              <div style={{ padding: 1.5 }}>
                <CItem index={i} data={item} disable />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CourseDetailScreen;
