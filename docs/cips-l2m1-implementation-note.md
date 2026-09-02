# CIPS L2M1 implementation boundary

The learner-facing CIPS page is intentionally a separate surface at this stage.

The existing multi-subject registry is embedded in `app.js`, a large shared engine with mature AAT, French, LSF, Code de la Route and Guitar behaviour. Replacing that file solely to add one registry entry would create an unnecessarily large regression surface. `cips2-bridge.js` therefore adds one native-looking card to the rendered subject picker and intercepts that card in the capture phase before the shared registry sees it.

The bridge preserves `multisubject_active`, so leaving CIPS returns the learner to the subject that was active beforehand. The bridge is covered by the CIPS browser gate and should be deleted when the subject registry is eventually extracted from `app.js` into a small independently editable module.

This is a transitional architecture decision, not permission to build later CIPS modules as disconnected pages. L2M2 onwards should reuse the CIPS page, progress model and navigation established by this vertical slice.
