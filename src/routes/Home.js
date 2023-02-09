import React, { useState, useEffect } from "react";
import Tweet from "routes/Tweet";
import { dbFirestore } from "fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();

    // db에 데이터 추가
    await addDoc(collection(dbFirestore, "tweets"), {
      text: tweet,
      createAt: Date.now(),
      createdId: userObj.uid,
    });
  };

  // 입력값
  const onChange = (event) => {
    const { value } = event.target;
    setTweet(value);
  };

  // db로 부터 데이터 불러오기
  useEffect(() => {
    const q = query(
      collection(dbFirestore, "tweets"),
      orderBy("createAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const tweetArr = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      console.log("tweetArr");
      console.log(tweetArr);
      setTweets(tweetArr);
    });
  }, []);

  console.log(tweets);
  console.log(userObj);

  return (
    <div className="container home_container">
      {/* 글을 작성 하는 코드 */}
      <form onSubmit={onSubmit} className="homeForm">
        <div className="homeInput__container">
          <input
            value={tweet}
            onChange={onChange}
            type="text"
            placeholder="당신의 마음을 표현해 주세요 :)"
            className="homeInput__input"
          />{" "}
          <input
            type="submit"
            value="✅"
            style={{ fontSize: 28 }}
            className="homeInput__arror"
          />
        </div>
      </form>
      <div>
        {tweets.map((tweet) => {
          console.log(tweet.text);

          if (tweet.text.includes("g")) {
            return;
          }

          return (
            <div key={tweet.id}>
              <Tweet
                key={tweet.id}
                nweetObj={tweet}
                isOwner={tweet.createdId === userObj.uid}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
