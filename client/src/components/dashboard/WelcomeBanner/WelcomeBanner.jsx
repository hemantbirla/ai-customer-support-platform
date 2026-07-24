import useAuth from "../../../hooks/useAuth";
import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  const { user } = useAuth();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const userName = user?.name || "User";

  return (
    <section className="welcome-banner">
      <div className="welcome-banner__content">
        <p className="welcome-banner__date">{currentDate}</p>

        <h1 className="welcome-banner__title">Welcome back, {userName} 👋</h1>

        <p className="welcome-banner__subtitle">
          Here's an overview of your support activity today.
        </p>
      </div>
    </section>
  );
};

export default WelcomeBanner;
