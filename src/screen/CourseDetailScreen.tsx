import { useEffect } from "react";
import { Textarea } from "../components/Input";
import { CourseActionField } from "../components/Btn/CourseActionField";
import { ProfileCard } from "../components/card/ProfileCard";
import { CourseImage } from "../components/Input/CourseImage";
import { BackHeader } from "../components/BackHeader";
import useSWR from "swr";
import { useHistory, useParams } from "react-router";
import { API_URL, postfetch } from "../components/common";
import fetcher, { fetcherBlob } from "../hook/useSWR/fetcher";
import { useRecoilState } from "recoil";
import { loadingState, shareModalState } from "../components/recoil";
import { CourseType } from "../types/Course";
import { BottomSheet } from "react-spring-bottom-sheet";
import { GRAY6, GRAY7, GRAY8, SCREEN_HEIGHT, styleCenter } from "../style";
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
import { CItem, MCItem } from "../components/Input/CommandInput/CItem";
import { ContentItemType } from "../types/Command";
//#endregion

const CourseDetailScreen = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  //#region 스크롤 열기
  useEffect(() => {
    // 스크롤 관리
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "overflow: scroll;");
    return () => {
      body.setAttribute("style", "overflow: hidden;");
      setLoading(false);
    };
  }, []);
  //#endregion
  //#region  데이터관리
  const { id }: { id: string | undefined } = useParams();
  const { data, error, mutate } = useSWR(`${API_URL}/courses?id=${id}`, fetcher);
  if ((error || !data) && !loading) setLoading(true);
  const course: CourseType = data ? data[0] : null;
  //#region 조회수 증가
  useEffect(() => {
    if (course)
      postfetch(`/courses/${id}`, JSON.stringify({ views: course.views ? Number(course.views) + 1 : 1 }), true, "PUT").then((d) => mutate());
  }, []);
  //#endregion
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

  //#endregion

  return (
    <>
      <div style={{ position: "fixed" }}>
        <BackHeader />
      </div>
      <CourseArea mutate={mutate} course={course} />
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
      <div style={{ ...styleCenter, display: "flex", flexFlow: "wrap", color: GRAY7, fontSize: 15 }}>
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

const CourseArea = ({ mutate, course }: { course: CourseType, mutate: any }) => {
  //#region main image
  const history = useHistory();
  const { data: image, error } = useSWR(
    course && course.images && course.images.length > 0 ? course.images[0].url : null,
    fetcherBlob
  );
  //#endregion
  //#region let content
  let content: ContentItemType[] = [];
  try {
    content = JSON.parse(course.content);
  } catch (error) { }
  //#endregion

  return (
    <>
      <CourseImage imgUrl={image} />
      <div style={{ padding: "0 16px 80px 16px" }}>
        <div style={{ marginTop: 16 }}>
          <Textarea
            disabled
            defaultValue={course ? course.title ?? "" : ""}
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
              defaultValue={course && (course.description ?? "")}
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
          <CourseActionField mutate={mutate} course={course} />
          {course && course.creator_id && <ProfileCard
            userId={course && course.creator_id ? course.creator_id.id : -1}
            onClick={course && course.creator_id ? () => history.push(`/user/${course.creator_id.id}`) : () => alert("탈퇴/비공개 사용자입니다.")}
            address={course && course.creator_id ? course.creator_id.nickname : ""}
            title={course && course.creator_id ? course.creator_id.greeting === "" ? "인삿말이 없습니다." : course.creator_id.greeting : ""}
            // desc={`팔로워 ${u.follower ?? 0}명`}
            img={course && course.creator_id ? (course.creator_id.profile_image != undefined ? course.creator_id.profile_image : undefined) : undefined}
          />}
          <CommandArea content={content} />
        </div>
      </div>
    </>
  );
};

const CommandArea = ({ content }: { content: ContentItemType[] }) => {
  return (
    <div>
      {content.map((item, i: number) => {
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
                <MCItem index={i} data={item} disable />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CourseDetailScreen;
