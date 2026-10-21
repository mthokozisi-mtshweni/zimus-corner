import { DEV_NOTICE } from "../constants/devFixtures";

export default function DevBadge() {
  return (
    <span
      style={{
        position: "absolute",
        top: "0.75rem",
        left: "0.75rem",
        background: "var(--gold)",
        color: "var(--forest)",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        padding: "0.25rem 0.5rem",
        borderRadius: "var(--radius-sm)",
        textTransform: "uppercase",
        zIndex: 2,
      }}
    >
      {DEV_NOTICE}
    </span>
  );
}