import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import illustrationImg from "../assets/img/illustration.svg";
import logoImg from "../assets/img/logo.svg";
import { useAuth } from "../hooks/useAuth";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { database } from "../services/firebase";

export function NewRoom() {
  const history = useHistory();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h5>
            Seja bem vindo <strong>{user?.name}</strong>
          </h5>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
            <p>
              Quer entrar em uma sala já existente? <a href="/">Clique aqui</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
