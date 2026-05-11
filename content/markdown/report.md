# GLM, Kimi and DeepSeek Paper Compendium (2021–2026)

This report compiles and analyses all publicly‑available research papers and technical reports released by three major Chinese large‑model groups—**GLM/智谱清华系**, **Kimi/Moonshot AI** and **DeepSeek AI**—up until **9 May 2026**.  Each paper is summarised with its core contributions, novel methods and the context within the broader evolution of large language models (LLMs).  To help visualise the development of these series, bespoke timeline infographics are included.  Where applicable, statements are supported with citations to the original papers.  The report is intended to act as a reference for researchers and engineers wanting to understand how Chinese LLMs have advanced over the past few years.

---

## 1 GLM Series (Zhipu AI/Tsinghua)

![GLM timeline](../../assets/images/670cca9e-dd8d-4152-8b18-21e2dc6d5006.png)

The **General Language Model (GLM)** family began with the *GLM* pre‑training framework in 2021 and has evolved rapidly through several open‑weights releases.  Early work introduced novel pre‑training objectives such as **autoregressive blank‑infilling**, enabling bidirectional and autoregressive contexts【168908157033250†L100-L113】.  Over time, the line expanded to bilingual models, mixture‑of‑experts architectures and multimodal capabilities.

### GLM (2021) – General Language Model Pre‑training with Autoregressive Blank Infilling

The original GLM paper proposed a unified pre‑training objective that combines bidirectional masked language modelling and autoregressive text generation.  By infilling blanks with an autoregressive objective, GLM achieved strong results on both understanding and generation tasks.  The work introduced **blank‑infilling**, which randomly masks spans and trains the model to fill in the blanks in a left‑to‑right manner.  This balanced pre‑training improved downstream performance compared with separate masked‑ or causal‑LM pre‑training.

### GLM‑130B (2022) – An Open Bilingual Model

GLM‑130B scaled the architecture to 130 billion parameters and used a mixed Chinese–English corpus.  The model demonstrated that bilingual scaling could approach the performance of closed models such as GPT‑3, while maintaining open weights.  It laid the foundation for the later ChatGLM family.

### WebGLM (2023) – Efficient Web‑Enhanced Question Answering

WebGLM integrated retrieval into GLM to answer questions that require up‑to‑date knowledge.  The system retrieves relevant web pages, compresses them, and feeds them into the LLM along with the question.  This work highlighted that **retrieval‑augmented models** can reduce hallucinations and improve factuality.

### GLM‑4 Family (2024–2025)

The **GLM‑4** family unified several lines of research—agentic behaviour, reasoning and coding—into a single mixture‑of‑experts (MoE) architecture.  The authors report that GLM‑4.5 (355 billion parameters with 32 billion activated parameters) uses multi‑stage training on 23 trillion tokens and post‑training with **reinforcement learning (RL)** and expert iteration【268639334279867†L90-L101】.  Despite the smaller number of activated parameters compared with closed models, GLM‑4.5 achieved competitive scores on TAU‑Bench, AIME 24 and SWE‑Bench Verified, ranking among the top open‑source agentic models【268639334279867†L90-L101】.  A compact **GLM‑4.5‑Air** (106 billion parameters) was also released.  The GLM‑4 series pioneered the combination of reasoning, coding and autonomous agents into a single foundation model.

### GLM‑5 (2026) – From Vibe Coding to Agentic Engineering

GLM‑5 extends the GLM‑4 line by introducing **dynamic sparse attention (DSA)** and a fully asynchronous reinforcement‑learning pipeline.  According to the technical report, GLM‑5 reduces training and inference costs while extending the context window and improving agentic autonomy【485424636421920†L29-L59】【485424636421920†L114-L123】.  The model is trained on 27 trillion tokens, includes a mid‑training phase to extend context length to 200 k tokens, and performs sequential RL (reasoning RL followed by agentic RL).  It achieves roughly 20 % improvement over GLM‑4.7 on multiple agentic and coding benchmarks【485424636421920†L56-L65】.  With a score of 50 on the Artificial Analysis Intelligence Index and top rankings on LMArena, GLM‑5 demonstrates state‑of‑the‑art performance among open models【485424636421920†L56-L65】.

### Other GLM‑related Works

- **WebGLM** (2023) — retrieval‑augmented question answering.
- **GLM‑4V and GLM‑4.1V‑Thinking** — visual language models enabling multimodal reasoning.
- **GLM‑4.5V / GLM‑4.5‑Voice** (2024–2025) — audio‑ and speech‑enabled variants.
- **AutoGLM / GLM‑4.5‑Voice / GLM‑OCR** — agents for GUI automation and document understanding.
- **GLM‑5V‑Turbo** (2026) — a native multimodal foundation for agents.

## 2 Kimi Series (Moonshot AI)

![Kimi timeline](../../assets/images/3eeb56c2-ea71-49ca-a232-72f581eb069b.png)

Moonshot AI’s **Kimi** models focus on scaling reinforcement learning, mixture‑of‑experts and agentic intelligence.  They emphasise efficient optimisation (Muon/MuonClip) and multi‑modal extension.

### Kimi k1.5 (2025)

The **Kimi k1.5** release introduced reinforcement‑learning‑from‑AI‑feedback at scale and set new benchmarks on tasks requiring long‑term reasoning.  It demonstrated that smaller open models could compete with larger closed models by carefully designing RL training and dataset curation.

### Muon and MuonClip Optimisers (2025)

Muon is a training optimiser that reduces memory and computation costs for large MoE models by using partial parameter updates and adaptive scaling.  **MuonClip** improves upon Muon with a **QK‑clip** technique to stabilise training and enable one‑trillion‑parameter models.  This optimiser is a key component of later Kimi models.

### Kimi K2 (2025) – Open Agentic Intelligence

Kimi K2 is a one‑trillion‑parameter Mixture‑of‑Experts LLM with 32 billion activated parameters.  The team introduced the **MuonClip** optimiser, which addresses training instability while retaining the token efficiency of Muon.  K2 is pre‑trained on 15.5 trillion tokens without loss spikes and undergoes multi‑stage post‑training that includes **large‑scale agentic data synthesis** and **joint reinforcement learning**【67410423318236†L103-L119】.  On benchmarks, K2 achieves 66.1 % on Tau2‑Bench and strong scores on ACEBench, SWE‑Bench and GPQA【67410423318236†L103-L120】.  It demonstrates competitive coding, mathematics and reasoning performance and is released under an open licence.

### Kimi‑VL and Kimi‑Audio Technical Reports (2025)

Kimi‑VL introduces a vision–language variant with Mixture‑of‑Experts gating, while Kimi‑Audio focuses on audio understanding and generation.  Both extend the base architecture to handle multi‑modal inputs and outputs, continuing the trend towards unified foundation models.

### Kimi Linear and K2.5 (2025–2026)

**Kimi Linear** proposes an expressive yet efficient attention mechanism that combines local and global linear attention to improve long‑context processing, reducing memory cost while preserving performance.  **Kimi K2.5** builds upon K2 with enhanced vision‑agent capabilities, integrating reinforcement learning across modalities.

## 3 DeepSeek Series

![DeepSeek timeline](../../assets/images/e0f2953a-69ab-4808-907d-ff7f696a1f6d.png)

DeepSeek AI released a rich ecosystem of models that emphasise long‑term scaling (longtermism), mixture‑of‑experts and rigorous alignment through reinforcement learning.  The series spans language models, code models, vision–language models and formal theorem proving.

### DeepSeek LLM (2024) – Scaling Open‑Source Language Models with Longtermism

DeepSeek LLM explores scaling laws for 7‑billion and 67‑billion parameter models and proposes **longtermism**: a commitment to continually expand the training corpus (2 trillion tokens and growing).  The work introduces a dataset of 2 trillion tokens and uses supervised fine‑tuning and **direct preference optimisation** to produce chat models【635223886972408†L71-L81】.  Results show that DeepSeek 67B surpasses LLaMA 2 70B on benchmarks in code, mathematics and reasoning, and even outperforms GPT‑3.5 in open‑ended evaluations【635223886972408†L71-L81】.

### DeepSeekMoE (2024) – Towards Ultimate Expert Specialisation in Mixture‑of‑Experts

DeepSeekMoE addresses shortcomings in traditional MoE architectures like GShard.  The authors propose two strategies to improve expert specialisation: finely segmenting experts into many smaller experts and activating more of them, and isolating shared experts to capture common knowledge【202970295418643†L57-L76】.  At 2 billion parameters, DeepSeekMoE matches GShard 2.9B with 1.5 × fewer expert parameters【202970295418643†L57-L70】.  Scaled to 16 billion and 145 billion parameters, the architecture achieves performance comparable to dense models and more efficiently than GShard【202970295418643†L68-L77】.

### DeepSeek‑Coder and DeepSeek‑Coder‑V2 (2024)

These releases adapt the base architecture to code generation.  DeepSeek‑Coder trains on billions of lines of source code and synthetic data, achieving strong results on HumanEval‑X.  **DeepSeek‑Coder‑V2** employs Mixture‑of‑Experts and reinforcement learning to break the barrier between open and closed models for code intelligence, yielding improved pass@1 and pass@10 on code generation benchmarks.

### DeepSeek‑Math (2024) and DeepSeek‑Math‑V2 (2025)

DeepSeek‑Math trains on synthetic and formal mathematics data to push mathematical reasoning.  DeepSeek‑Math‑V2 introduces **self‑verifiable reasoning**, where the model proposes a solution and then produces a proof or verification, reducing hallucinations and improving accuracy on GPQA and AIME benchmarks.

### DeepSeek‑VL and DeepSeek‑VL2 (2024)

DeepSeek‑VL integrates vision and language using an MoE architecture, enabling real‑world multimodal understanding and generation.  **DeepSeek‑VL2** extends this with a larger set of experts and a broader corpus of images and videos.

### DeepSeek‑V2, V3, V3.2 and Related Reports (2024–2025)

**DeepSeek‑V2** combines MoE with **multi‑scale local attention (MLA)** to reduce computational cost while keeping performance.  **DeepSeek‑V3** introduces an even larger MoE (671 billion parameters, 37 billion activated) and a new training curriculum that mixes RL for reward modelling with agentic tasks.  The V3 technical report also proposes a **hardware‑aligned sparse attention** strategy and a **load‑balancing** method for MoE.  **DeepSeek‑V3.2** (2025) pushes this frontier further with dynamic sparse attention, RL on agentic tasks and improved alignment strategies.

### Reinforcement‑Learning and Formal Proving Papers

The **DeepSeek‑R1** paper introduces an RL algorithm to incentivise reasoning during training, improving chain‑of‑thought quality.  **DeepSeek‑Prover** (and its subsequent versions) apply reinforcement learning and Monte‑Carlo tree search to formal theorem proving in Lean 4.  These models demonstrate that LLMs can generate proofs for thousands of theorems, bridging natural language and formal logic.

---

## 4 Discussion and Outlook

Across the GLM, Kimi and DeepSeek lines, several themes emerge:

- **Mixture‑of‑Experts for Efficiency.**  All three groups leverage MoE to increase total parameters while keeping the number of activated parameters modest.  GLM‑4.5 (355 B total, 32 B activated) and Kimi K2 (1 T total, 32 B activated) showcase this design【268639334279867†L90-L101】【67410423318236†L103-L119】.  DeepSeekMoE refines expert routing and specialisation with segmented experts and shared experts【202970295418643†L57-L76】.
- **Large‑Scale Reinforcement Learning.**  GLM‑4.5/5 and Kimi K2 conduct multi‑stage post‑training using RL to align models for agentic tasks.  DeepSeek’s R1 and Prover lines extend RL to reasoning and formal proving.
- **Long‑Termism and Data Scaling.**  DeepSeek emphasises continuously growing datasets (2 trillion tokens and beyond) and studies scaling laws【635223886972408†L71-L81】.  GLM‑5 extends context windows to 200 k tokens【485424636421920†L114-L123】, while Kimi adopts MuonClip to stably train one‑trillion‑parameter models.
- **Multimodal Expansion.**  All three series now include vision, audio and speech variants (GLM‑4V, Kimi‑VL/A, DeepSeek‑VL/VL2) and are moving towards unified multimodal agents.

### Limitations

The analysis above summarises dozens of papers; it inevitably glosses over implementation details and experimental nuances.  Many technical reports contain additional engineering insights (e.g. optimisation schedules, dataset specifics) that are not fully covered here.  Where possible, readers should consult the original papers for comprehensive descriptions (links provided in the references section).

---

## 5 Reference Links

Below are direct links to the primary papers discussed.  These links point to the official arXiv or project pages; most include PDF downloads.  Due to technical restrictions in this environment, the original PDF files could not be attached directly, but the links allow you to obtain them from the source.

### GLM Series

1. **GLM: General Language Model Pre‑training with Autoregressive Blank Infilling** (2021) — <https://arxiv.org/abs/2103.10360>
2. **GLM‑130B: An Open Bilingual Pre‑trained Model** (2022) — <https://arxiv.org/abs/2210.02414>
3. **WebGLM** (2023) — <https://arxiv.org/abs/2306.07906>
4. **ChatGLM / GLM‑4 All Tools** (2024) — <https://arxiv.org/abs/2406.12793>
5. **AutoGLM: Autonomous Foundation Agents for GUIs** (2024) — <https://arxiv.org/abs/2411.00820>
6. **GLM‑4‑Voice** (2024) — <https://arxiv.org/abs/2412.02612>
7. **GLM‑4.1V‑Thinking & GLM‑4.5V** (2025) — <https://arxiv.org/abs/2507.01006>
8. **GLM‑4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models** (2025) — <https://arxiv.org/abs/2508.06471>
9. **GLM‑TTS Technical Report** (2025) — <https://arxiv.org/abs/2512.14291>
10. **GLM‑5: From Vibe Coding to Agentic Engineering** (2026) — <https://arxiv.org/abs/2602.15763>
11. **GLM‑OCR Technical Report** (2026) — <https://arxiv.org/abs/2603.10910>
12. **GLM‑5V‑Turbo** (2026) — <https://arxiv.org/abs/2604.26752>

### Kimi Series

1. **Mooncake: A KVCache‑Centric Disaggregated Architecture for LLM Serving** (2024) — <https://arxiv.org/abs/2407.00079>
2. **Kimi k1.5: Scaling Reinforcement Learning with LLMs** (2025) — <https://arxiv.org/abs/2501.12599>
3. **Muon is Scalable for LLM Training** (2025) — <https://arxiv.org/abs/2502.16982>
4. **Kimi‑VL Technical Report** (2025) — <https://arxiv.org/abs/2504.07491>
5. **Kimi‑Audio Technical Report** (2025) — <https://arxiv.org/abs/2504.18425>
6. **Kimi K2: Open Agentic Intelligence** (2025/2026) — <https://arxiv.org/abs/2507.20534>
7. **Kimi Linear: An Expressive, Efficient Attention Architecture** (2025) — <https://arxiv.org/abs/2510.26692>
8. **Kimi K2.5: Visual Agentic Intelligence** (2026) — <https://arxiv.org/abs/2602.02276>

### DeepSeek Series

1. **DeepSeek LLM: Scaling Open‑Source Language Models with Longtermism** (2024) — <https://arxiv.org/abs/2401.02954>
2. **DeepSeekMoE: Towards Ultimate Expert Specialisation in Mixture‑of‑Experts Language Models** (2024) — <https://arxiv.org/abs/2401.06066>
3. **DeepSeek‑Coder: When the Large Language Model Meets Programming** (2024) — <https://arxiv.org/abs/2401.14196>
4. **DeepSeek‑Math: Pushing the Limits of Mathematical Reasoning** (2024) — <https://arxiv.org/abs/2402.03300>
5. **DeepSeek‑VL: Towards Real‑World Vision–Language Understanding** (2024) — <https://arxiv.org/abs/2403.05525>
6. **DeepSeek‑V2: A Strong, Economical and Efficient Mixture‑of‑Experts Language Model** (2024) — <https://arxiv.org/abs/2405.04434>
7. **DeepSeek‑Prover** (2024) — <https://arxiv.org/abs/2405.14333>
8. **DeepSeek‑Coder‑V2** (2024) — <https://arxiv.org/abs/2406.11931>
9. **Let the Expert Stick to His Last: Expert‑Specialised Fine‑Tuning for Sparse Models** (2024) — <https://arxiv.org/abs/2407.01906>
10. **Auxiliary‑Loss‑Free Load Balancing Strategy for Mixture‑of‑Experts** (2024) — <https://arxiv.org/abs/2408.15664>
11. **DeepSeek‑Prover V1.5 and V2** (2024–2025) — <https://arxiv.org/abs/2408.08152>, <https://arxiv.org/abs/2504.21801>
12. **Janus and JanusFlow** (2024) — <https://arxiv.org/abs/2410.13848>, <https://arxiv.org/abs/2411.07975>
13. **DeepSeek‑VL2** (2024) — <https://arxiv.org/abs/2412.10302>
14. **DeepSeek‑V3 Technical Report** (2024) — <https://arxiv.org/abs/2412.19437>
15. **Janus‑Pro** (2025) — <https://arxiv.org/abs/2501.17811>
16. **DeepSeek‑R1** (2025) — <https://arxiv.org/abs/2501.12948>
17. **Native Sparse Attention** (2025) — <https://arxiv.org/abs/2502.11089>
18. **Inference‑Time Scaling for Generalist Reward Modelling** (2025) — <https://arxiv.org/abs/2504.02495>
19. **DeepSeek‑OCR** (2025) — <https://arxiv.org/abs/2510.18234>
20. **DeepSeek‑Math‑V2** (2025) — <https://arxiv.org/abs/2511.22570>
21. **DeepSeek‑V3.2** (2025) — <https://arxiv.org/abs/2512.02556>

---

### Acknowledgements

The analysis above was compiled using publicly available information from the cited papers.  Specific statements about model size, token counts, training strategies and benchmark results are drawn directly from the corresponding arXiv abstracts and technical reports【485424636421920†L56-L65】【268639334279867†L90-L101】【67410423318236†L103-L119】【635223886972408†L71-L81】【202970295418643†L57-L76】.


