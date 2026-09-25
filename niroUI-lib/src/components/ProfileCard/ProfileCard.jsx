import React, { useState } from "react";

export const ProfileCard = ({
  name = "JhonDoe",
  username = "@JhonDoe",
  role = "Teacher",
  bio = "Building intelligent systems,  and immersive web experiences.",
  avatar = "https://i.pravatar.cc/300?img=12",
  location = "Pakistan",
  followers = "12.4K",
  projects = "48",
  following = "286",
  githubUrl = "#",
  linkedinUrl = "#",
  email = "mailto:hello@example.com",
}) => {
  const [hovered, setHovered] = useState(false);

  const styles = {
    wrapper: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px",
      boxSizing: "border-box",
      background:
        "radial-gradient(circle at top left, #172554 0%, transparent 35%), radial-gradient(circle at bottom right, #312e81 0%, transparent 35%), #050816",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      overflow: "hidden",
    },

    card: {
      position: "relative",
      width: "min(410px, 100%)",
      padding: "1px",
      borderRadius: "30px",
      background:
        "linear-gradient(135deg, rgba(99,102,241,.9), rgba(168,85,247,.3), rgba(34,211,238,.8))",
      boxShadow: hovered
        ? "0 30px 80px rgba(99,102,241,.35), 0 0 80px rgba(34,211,238,.12)"
        : "0 20px 60px rgba(0,0,0,.35)",
      transform: hovered
        ? "translateY(-10px) scale(1.015)"
        : "translateY(0) scale(1)",
      transition: "all .5s cubic-bezier(.2,.8,.2,1)",
    },

    inner: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "29px",
      padding: "30px",
      background: "rgba(7, 10, 25, .88)",
      backdropFilter: "blur(22px)",
      WebkitBackdropFilter: "blur(22px)",
    },

    glow: {
      position: "absolute",
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      background: "rgba(99,102,241,.25)",
      filter: "blur(55px)",
      top: "-70px",
      right: "-50px",
      pointerEvents: "none",
    },

    topLine: {
      position: "absolute",
      top: 0,
      left: hovered ? "10%" : "50%",
      width: hovered ? "80%" : "30%",
      height: "2px",
      transform: "translateX(-50%)",
      background:
        "linear-gradient(90deg, transparent, #60a5fa, #a78bfa, transparent)",
      boxShadow: "0 0 20px #6366f1",
      transition: "all .6s ease",
    },

    avatarContainer: {
      position: "relative",
      width: "112px",
      height: "112px",
      margin: "0 auto 20px",
    },

    avatarRing: {
      position: "absolute",
      inset: "-5px",
      borderRadius: "50%",
      background:
        "conic-gradient(from 0deg, #22d3ee, #6366f1, #a855f7, #22d3ee)",
      animation: "spin 5s linear infinite",
    },

    avatar: {
      position: "absolute",
      inset: "3px",
      width: "calc(100% - 6px)",
      height: "calc(100% - 6px)",
      objectFit: "cover",
      borderRadius: "50%",
      border: "4px solid #080b18",
      boxSizing: "border-box",
    },

    online: {
      position: "absolute",
      right: "3px",
      bottom: "5px",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#22c55e",
      border: "4px solid #080b18",
      boxShadow: "0 0 15px rgba(34,197,94,.8)",
    },

    name: {
      margin: "0",
      textAlign: "center",
      color: "#fff",
      fontSize: "27px",
      fontWeight: 800,
      letterSpacing: "-.7px",
    },

    username: {
      marginTop: "5px",
      textAlign: "center",
      color: "#818cf8",
      fontSize: "14px",
      fontWeight: 600,
    },

    role: {
      display: "table",
      margin: "14px auto 0",
      padding: "7px 13px",
      borderRadius: "999px",
      background: "rgba(99,102,241,.12)",
      border: "1px solid rgba(129,140,248,.25)",
      color: "#c7d2fe",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: ".3px",
    },

    bio: {
      margin: "18px auto 0",
      maxWidth: "310px",
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "14px",
      lineHeight: 1.7,
    },

    location: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
      marginTop: "14px",
      color: "#71717a",
      fontSize: "12px",
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
      marginTop: "25px",
      padding: "15px",
      borderRadius: "18px",
      background: "rgba(255,255,255,.035)",
      border: "1px solid rgba(255,255,255,.07)",
    },

    stat: {
      textAlign: "center",
    },

    statNumber: {
      color: "#f4f4f5",
      fontSize: "18px",
      fontWeight: 800,
    },

    statLabel: {
      marginTop: "3px",
      color: "#71717a",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },

    buttons: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "9px",
      marginTop: "18px",
    },

    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "43px",
      borderRadius: "13px",
      textDecoration: "none",
      color: "#d4d4d8",
      background: "rgba(255,255,255,.045)",
      border: "1px solid rgba(255,255,255,.08)",
      fontSize: "12px",
      fontWeight: 700,
      transition: "all .3s ease",
    },

    footer: {
      marginTop: "20px",
      textAlign: "center",
      color: "#52525b",
      fontSize: "10px",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-7px);
            }
          }

          .profile-button:hover {
            transform: translateY(-3px);
            background: rgba(99,102,241,.16) !important;
            border-color: rgba(129,140,248,.35) !important;
            color: #fff !important;
            box-shadow: 0 8px 25px rgba(99,102,241,.15);
          }

          .profile-avatar {
            animation: float 4s ease-in-out infinite;
          }

          @media (max-width: 480px) {
            .profile-inner {
              padding: 24px !important;
            }
          }
        `}
      </style>

      <div style={styles.wrapper}>
        <div
          style={styles.card}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={styles.inner} className="profile-inner">
            <div style={styles.topLine} />
            <div style={styles.glow} />

            <div style={styles.avatarContainer} className="profile-avatar">
              <div style={styles.avatarRing} />

              <img
                src={avatar}
                alt={`${name} profile`}
                style={styles.avatar}
              />

              <span style={styles.online} />
            </div>

            <h2 style={styles.name}>{name}</h2>

            <div style={styles.username}>{username}</div>

            <div style={styles.role}>{role}</div>

            <p style={styles.bio}>{bio}</p>

            <div style={styles.location}>
              <span>✦</span>
              <span>{location}</span>
            </div>

            <div style={styles.stats}>
              <div style={styles.stat}>
                <div style={styles.statNumber}>{followers}</div>
                <div style={styles.statLabel}>Followers</div>
              </div>

              <div style={styles.stat}>
                <div style={styles.statNumber}>{projects}</div>
                <div style={styles.statLabel}>Projects</div>
              </div>

              <div style={styles.stat}>
                <div style={styles.statNumber}>{following}</div>
                <div style={styles.statLabel}>Following</div>
              </div>
            </div>

            <div style={styles.buttons}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                style={styles.button}
                className="profile-button"
              >
                GitHub
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                style={styles.button}
                className="profile-button"
              >
                LinkedIn
              </a>

              <a
                href={email}
                style={styles.button}
                className="profile-button"
              >
                Contact
              </a>
            </div>

            <div style={styles.footer}>
              Building the future · one project at a time
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;