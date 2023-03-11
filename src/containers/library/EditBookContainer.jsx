import { format } from "date-fns";
import { Navigate, useLoaderData, useNavigate } from "react-router";
import styled from "styled-components";
import { editBook } from "../../apis/library";

import {
  ButtonComponent,
  InputComponent,
  MainWrapperComponent,
  TextareaComponent,
  TitleComponent,
} from "../../components/common";
import { http } from "../../libs/http";

const Wrapper = styled.section`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  hr {
    width: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const EditBookContainer = () => {
  const { data, status } = useLoaderData();
  const { _id, title, subtitle, author, date_of_publication, publisher, img, description, creat_date } = data;

  const navigate = useNavigate();
  const handleCancelOnClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const req = {
      _id: _id,
      title: target[0].value,
      subtitle: target[1].value,
      author: target[2].value,
      date_of_publication: target[3].value,
      publisher: target[4].value,
      img: target[5].value,
      description: target[6].value,
      creat_date: creat_date,
      user_id: "admin",
      user_name: "admin",
    };

    await editBook(_id, req)
      .then(() => {
        navigate(`/library/detail/${_id}`);
      })
      .catch((err) => {
        alert("수정에 실패하였습니다.");
      });
  };

  if (status === "error") return <Navigate to={-1} />;

  return (
    <MainWrapperComponent>
      <TitleComponent title="책 수정하기" />
      <Wrapper>
        <Form onSubmit={handleOnSubmit}>
          <InputComponent defaultValue={title} name="Title" required={true} />
          <InputComponent defaultValue={subtitle} name="Subtitle" />
          <InputComponent defaultValue={author} name="Author" required={true} />
          <InputComponent
            defaultValue={format(new Date(date_of_publication), "yyyy-MM-dd")}
            name="Date of Publication"
            type="date"
            required={true}
            inputStyle={{ padding: "0 20px" }}
          />
          <InputComponent defaultValue={publisher} name="Publisher" required={true} />
          <InputComponent defaultValue={img} name="Img" />
          <hr />
          <TextareaComponent defaultValue={description} name="Description" />
          <hr />

          <div>
            <ButtonComponent style={{ width: "80px", backgroundColor: "#8E0023" }} name="제출" type="submit" />
            <ButtonComponent
              style={{ width: "80px", backgroundColor: "#808080" }}
              name="취소"
              fn={handleCancelOnClick}
            />
          </div>
        </Form>
      </Wrapper>
    </MainWrapperComponent>
  );
};

export default EditBookContainer;
