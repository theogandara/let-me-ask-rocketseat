import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImage from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const history = useNavigate();

  const { user, signInWithGoogle } = useAuth();

  const handleCreateRomm = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    history("/room/new");
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo"></img>
          <button onClick={handleCreateRomm} className="create-room">
            <img src={googleImage} alt="Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
