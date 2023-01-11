export function Detail({ user, onBack }) {
  if (!user) return null;
  const { avatar, first_name, last_name, email } = user;

  return (
    <div className="detail-view">
      <div className="user-card">
        <img src={avatar} alt="Avatar" className="avatar lg" />
        <div className="info">
          <h3>
            {first_name} {last_name}
          </h3>
          <p>{email}</p>
        </div>
      </div>
      <button onClick={onBack} className="back-button">
        Return to list
      </button>
    </div>
  );
}
