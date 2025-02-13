import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GrReturn } from "react-icons/gr";
import { motion } from "framer-motion";
import "./RotinaDetail.css";

/**
 * Função auxiliar para converter a URL do YouTube em formato embed,
 * caso seja um link do tipo watch?v=xyz ou youtu.be/xyz etc.
 */
function getYoutubeEmbedUrl(url) {
  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11
    ? `https://www.youtube.com/embed/${match[1]}`
    : url;
}

const RotinaDetail = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const { aluno } = useContext(AuthContext);
  const rotina = aluno.rotinas[parseInt(index, 10)];
  const treinos = rotina.treinos || [];

  // Controle do início do treino (para exibir ou não o botão “Terminar Treino”)
  const [treinoIniciado, setTreinoIniciado] = useState(false);

  // Estado para marcar quais exercícios foram concluídos
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState(() => {
    const map = {};
    treinos.forEach((treino) => {
      treino.exercicios.forEach((ex) => {
        map[ex.id] = false;
      });
    });
    return map;
  });

  // Estados para o modal que guiará o exercício
  const [activeExercise, setActiveExercise] = useState(null);
  const [exerciseGuideModalOpen, setExerciseGuideModalOpen] = useState(false);

  const terminarTreino = () => {
    const totalExercicios = Object.keys(exerciciosConcluidos).length;
    const concluidos = Object.values(exerciciosConcluidos).filter(
      (v) => v
    ).length;
    const porcentagem = (concluidos / totalExercicios) * 100;
    alert(
      `Você concluiu ${concluidos} de ${totalExercicios} exercícios.\nAproveitamento: ${porcentagem.toFixed(
        1
      )}%`
    );
    setTreinoIniciado(false);
    // (Opcional) Reinicia o status dos exercícios:
    const reset = {};
    Object.keys(exerciciosConcluidos).forEach((key) => {
      reset[key] = false;
    });
    setExerciciosConcluidos(reset);
  };

  // Componente interno: Modal que guia o exercício
  const ExerciseGuideModal = ({ exercise, onClose }) => {
    // Propriedades do exercício: nome, series, repeticoes, descanso
    const totalSets = exercise.series; // ex.: 4 séries
    const [currentSet, setCurrentSet] = useState(1);
    const [phase, setPhase] = useState("ready"); // "ready" | "inProgress" | "rest"
    const [restTime, setRestTime] = useState(0);

    // Estado adicional para mostrar/ocultar o vídeo
    const [showVideo, setShowVideo] = useState(false);

    // Efeito para o timer de descanso (fase "rest")
    useEffect(() => {
      let timer;
      if (phase === "rest" && restTime > 0) {
        timer = setInterval(() => {
          setRestTime((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(timer);
            return 0;
          });
        }, 1000);
      } else if (phase === "rest" && restTime === 0) {
        // Descanso finalizado; volta para o estado "ready"
        setPhase("ready");
        if (currentSet < totalSets) {
          setCurrentSet((prev) => prev + 1);
        } else {
          // Todas as séries concluídas; fecha o modal e marca o exercício como concluído
          onClose(true);
        }
      }
      return () => clearInterval(timer);
    }, [phase, restTime, currentSet, totalSets, onClose]);

    const handleStartSeries = () => {
      setPhase("inProgress");
    };

    const handleFinishSeries = () => {
      // Finaliza a série atual e inicia o descanso
      setPhase("rest");
      setRestTime(exercise.descanso);
    };

    return (
      <motion.div
        className="exercise-guide-modal-inner"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{exercise.nome}</h1>
        <p>
          Série {currentSet} de {totalSets}
        </p>
        <p>Repetições: {exercise.repeticoes}</p>

        {/* Se houver videoUrl, exibir botões para abrir/fechar vídeo */}
        {exercise.videoUrl && (
          <div style={{ marginBottom: "1rem" }}>
            {!showVideo ? (
              <motion.button
                className="modal-btn"
                onClick={() => setShowVideo(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Vídeo
              </motion.button>
            ) : (
              <>
                <div className="video-container" style={{ margin: "1rem 0" }}>
                  <iframe
                    width="560"
                    height="315"
                    src={getYoutubeEmbedUrl(exercise.videoUrl)}
                    title="Exemplo de Exercício"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <motion.button
                  className="modal-btn"
                  onClick={() => setShowVideo(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Fechar Vídeo
                </motion.button>
              </>
            )}
          </div>
        )}

        {/* Botões de controle de série/descanso */}
        {phase === "ready" && (
          <motion.button
            className="modal-btn"
            onClick={handleStartSeries}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar Série
          </motion.button>
        )}
        {phase === "inProgress" && (
          <motion.button
            className="modal-btn"
            onClick={handleFinishSeries}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Finalizar Série
          </motion.button>
        )}
        {phase === "rest" && (
          <div className="rest-timer">
            <h2>Descanso: {restTime}s</h2>
          </div>
        )}

        {/* Botão para cancelar o modal e não considerar o exercício concluído */}
        <motion.button
          className="modal-cancel-btn"
          onClick={() => onClose(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancelar
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="rotina-detail">
      <motion.header
        className="detail-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={() => navigate(-1)}>
          <GrReturn />
        </button>
        <h2>Treino {String.fromCharCode(65 + parseInt(index, 10))}</h2>
      </motion.header>

      <motion.main
        className="detail-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!treinoIniciado && (
          <motion.button
            className="iniciar-treino-btn"
            whileHover={{ scale: 1.02 }}
            onClick={() => setTreinoIniciado(true)}
          >
            Iniciar Treino
          </motion.button>
        )}
        {treinos.length === 0 ? (
          <p>Não há treinos nesta rotina.</p>
        ) : (
          treinos.map((treino, idx) => (
            <motion.div
              key={idx}
              className="treino-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3>
                {treino.grupoMuscular.charAt(0).toUpperCase() +
                  treino.grupoMuscular.slice(1)}
              </h3>
              {treino.observacoes && <p>{treino.observacoes}</p>}
              <hr />
              {treino.exercicios.map((exercicio) => (
                <motion.div
                  key={exercicio.id}
                  className={`exercicio-card ${
                    exerciciosConcluidos[exercicio.id] ? "concluido" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setActiveExercise(exercicio);
                    setExerciseGuideModalOpen(true);
                  }}
                >
                  <div className="exercicio-info">
                    <p>{exercicio.nome}</p>
                    <small>
                      {exercicio.series} x {exercicio.repeticoes}
                    </small>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))
        )}
      </motion.main>

      {treinoIniciado && (
        <motion.div
          className="terminar-treino-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            className="terminar-treino-btn"
            whileHover={{ scale: 1.02 }}
            onClick={terminarTreino}
          >
            Terminar Treino
          </motion.button>
        </motion.div>
      )}

      {/* Modal de Guia do Exercício */}
      {exerciseGuideModalOpen && activeExercise && (
        <motion.div
          className="exercise-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="exercise-modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ExerciseGuideModal
              exercise={activeExercise}
              onClose={(completed) => {
                if (completed) {
                  setExerciciosConcluidos((prev) => ({
                    ...prev,
                    [activeExercise.id]: true,
                  }));
                }
                setExerciseGuideModalOpen(false);
                setActiveExercise(null);
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RotinaDetail;
