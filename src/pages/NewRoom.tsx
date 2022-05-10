import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { FormEvent, useState } from "react";

import "../styles/auth.scss";
import { Button } from "../components/Button";

import { Link, useNavigate } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

export const NewRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/room/${firebaseRoom.key}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração" />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo"></img>
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              onChange={(e) => setNewRoom(e.target.value)}
              placeholder="Nome da sala"
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
