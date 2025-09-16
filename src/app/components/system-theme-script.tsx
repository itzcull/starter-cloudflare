export function SystemThemeScript() {
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: necessary for injecting script
			dangerouslySetInnerHTML={{
				__html: `
          const matcher = window.matchMedia("(prefers-color-scheme: dark)");
          const systemColorMode = matcher.matches ? "dark" : "light";
          const storedColorMode = localStorage.getItem("__reshaped-mode");

          document.documentElement.setAttribute("data-rs-color-mode", storedColorMode || systemColorMode);
          matcher.addEventListener("change", () => {
            document.documentElement.setAttribute("data-rs-color-mode", systemColorMode);
          });
      `
			}}
		/>
	)
}
