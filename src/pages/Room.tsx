import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Questions } from "../components/Questions";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<
  string,
  {
    id: string;
    content: string;
    author: {
      name: string;
      avatar: string;
    };
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

type QuestionsType = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

export const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [questions, setQuestions] = useState<QuestionsType[]>([]);
  const [titleRoom, setTitleRoom] = useState();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();

      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;

      const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );

      setQuestions(parsedQuestions);
      console.log(parsedQuestions);
      setTitleRoom(databaseRoom.title);
    });
  }, [roomId]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("vc precisa logar");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img alt="logo" src={logoImg} />
          <RoomCode code={roomId!} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{titleRoom}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            spellCheck="false"
            autoFocus
            maxLength={100}
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
            placeholder="Faça sua pergunta !!"
          />

          {questions.map((question) => (
            <Questions
              id={question.id}
              content={question.content}
              author={question.author}
            />
          ))}

          <div className="form-footer">
            {!user ? (
              <span>
                Para env uma perg,<button>faça seu login</button>.
              </span>
            ) : (
              <div className="user-info">
                <img alt={user.name} src={user.avatar} />
                <span>{user.name}</span>
              </div>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};
