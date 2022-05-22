import "../styles/questions.scss";

interface QuestiosInterface {
  author: {
    avatar: string;
    name: string;
  };
  content: string;
  id: string;
}

export const Questions = ({ author, content, id }: QuestiosInterface) => {
  return (
    <div className="question">
      <img className="img-perfil" alt="logo" src={author.avatar} />
      <div className="content-question">
        <h3 className="text"> {content} </h3>
      </div>
    </div>
  );
};
