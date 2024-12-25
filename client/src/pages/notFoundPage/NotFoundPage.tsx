import GenericModal from "@components/genericModal/GenericModal";
import useNavigateBack from "@hooks/helpers/useNavigateBack";

const NotFoundPage = () => {
  const navigateBack = useNavigateBack();
  return (
    <div className="pageContainer">
      <GenericModal
        displayModal={true}
        title="Sidan kunde inte hittas"
        content={"Sidan du försöker öppna finns inte!"}
        primaryButtonAction={navigateBack}
        primaryButtonText="Gå tillbaka"
      />
    </div>
  );
};

export default NotFoundPage;
