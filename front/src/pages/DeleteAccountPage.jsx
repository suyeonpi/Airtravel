import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DeleteAccountPage(props) {
  const [inputAlertMsg, setInputAlertMsg] = useState(false);
  const [inputAlertMsgContent, setInputAlertMsgContent] = useState("");

  const CheckBox1 = useRef();
  const CheckBox2 = useRef();
  const InputPW = useRef();
  const navigate = useNavigate();

  const onSubmitDeleteAccountForm = (event) => {
    event.preventDefault();

    if (validateDeleteAccountForm()) {
      axios
        .delete("http://localhost:8080/api/v1/users", {
          headers: { Authorization: `Bearer ${localStorage.token}` },
          data: {
            password: String(InputPW.current.value),
          },
        })
        .then((res) => {
          localStorage.removeItem("token");
          navigate("/");
        })
        .catch((err) => {
          setInputAlertMsg(true);
          if (err.response) {
            setInputAlertMsgContent(err.response.data.message);
          } else {
            setInputAlertMsgContent("서버 요청에 문제가 있습니다.");
          }
        });
    }
  };

  const validateDeleteAccountForm = () => {
    if (
      !(
        CheckBox1.current.checked === true && CheckBox2.current.checked === true
      )
    ) {
      setInputAlertMsg(true);
      setInputAlertMsgContent("모든 약관에 동의해주세요.");
      return false;
    }

    console.log(String(InputPW.current.value).length);
    if (!(String(InputPW.current.value).length > 0)) {
      InputPW.current.focus();
      setInputAlertMsg(true);
      setInputAlertMsgContent("비밀번호를 입력해주세요.");
      return false;
    }

    return true;
  };

  return (
    <div className="delete__account">
      <form
        onSubmit={onSubmitDeleteAccountForm}
        className="delete__account-form"
        action=""
      >
        <div className="title">회원 탈퇴</div>
        <div className="divider"></div>
        <div className="delete__account-form-notice">
          <p>
            내정보 및 개인형 서비스 이용기록이 모두 삭제되며,
            <span className="warning">
              &nbsp;삭제된 데이터는 복구되지 않습니다.
            </span>
            <br />
            삭제되는 데이터를 확인하시고, 필요한 데이터는 미리 백업을 해주세요.
          </p>
        </div>

        <div class="agree">
          <div>안내 사항을 확인하였으며, 이에 동의합니다.</div>
          <input ref={CheckBox1} type="checkbox" />
        </div>

        <div className="delete__account-form-notice">
          <p>
            가입된 회원정보가 모두 삭제되며 삭제를 원하는 게시글이 있다면 반드시
            회원탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다. 탈퇴 후에는
            회원정보가 삭제되며 본인 여부를 확인할 수 있는 방법이 없어,
            <span className="warning">
              &nbsp;게시글을 임의로 삭제해드릴 수 없습니다.
            </span>
          </p>
        </div>

        <div class="agree">
          <div>안내 사항을 확인하였으며, 이에 동의합니다.</div>
          <input ref={CheckBox2} type="checkbox" />
        </div>

        <div className="divider"></div>

        <div class="last-check">
          <span>계속하시려면 비밀번호를 입력해주세요.</span>
          <input ref={InputPW} type="password" placeholder="비밀번호 확인" />
        </div>
        <div className={inputAlertMsg ? "msg-active" : "msg-inactive"}>
          {inputAlertMsgContent}
        </div>
        <div className="delete-btn-wrap">
          <input
            type="submit"
            className="btn btn__primary btn__large"
            type="submit"
            value="회원 탈퇴하기"
          />
        </div>
      </form>
    </div>
  );
}

export default DeleteAccountPage;
