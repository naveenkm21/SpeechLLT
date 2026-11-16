export interface SectionNavItem {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
}

export const EXHIBIT_SECTIONS: SectionNavItem[] = [
  { id: "introduction", number: "01", label: "Introduction", shortLabel: "Intro" },
  { id: "evolution", number: "02", label: "Evolution of MT", shortLabel: "Evolution" },
  { id: "pipeline", number: "03", label: "How MT Works", shortLabel: "Pipeline" },
  { id: "transformer", number: "04", label: "Transformer Architecture", shortLabel: "Transformer" },
  { id: "components", number: "05", label: "Core Components", shortLabel: "Components" },
  { id: "lab", number: "06", label: "Translation Lab", shortLabel: "Lab" },
  { id: "case-study", number: "07", label: "Google Translate Case Study", shortLabel: "Case Study" },
  { id: "training", number: "08", label: "Training & Evaluation", shortLabel: "Training" },
  { id: "challenges", number: "09", label: "Challenges & Limitations", shortLabel: "Challenges" },
  { id: "future", number: "10", label: "Future of MT", shortLabel: "Future" },
  { id: "quiz", number: "11", label: "Knowledge Check", shortLabel: "Quiz" },
  { id: "references", number: "12", label: "References", shortLabel: "References" },
];

export interface EvolutionGeneration {
  id: "rbmt" | "smt" | "nmt";
  code: string;
  title: string;
  era: string;
  accent: string;
  tagline: string;
  architecture: string;
  howItWorks: string;
  advantages: string[];
  limitations: string[];
  exampleInput: string;
  exampleOutput: string;
  exampleAnnotation: string;
  diagramSteps: { label: string; detail: string }[];
}

export const EVOLUTION_GENERATIONS: EvolutionGeneration[] = [
  {
    id: "rbmt",
    code: "Generation I",
    title: "Rule-Based Machine Translation (RBMT)",
    era: "1950s – 1990s",
    accent: "#EA4335",
    tagline: "Handcrafted grammatical rules and bilingual dictionaries.",
    architecture:
      "Explicit linguistic pipeline: Morphological Analyzer → Syntactic Parser → Bilingual Transfer Rules → Target Grammar Generator.",
    howItWorks:
      "Human linguists manually write thousands of grammar rules and dictionary mappings. The system parses the source sentence into an abstract syntax tree, applies structural transfer rules (e.g., swapping adjective-noun order), and generates target words from a lookup lexicon.",
    advantages: [
      "Deterministic and predictable output when rules match cleanly",
      "Requires no large parallel training corpora",
      "Easy to enforce strict domain terminology via dictionary overrides",
    ],
    limitations: [
      "Fails on idiomatic language, slang, and unmodeled exceptions",
      "Combinatorial explosion: maintaining rules across dozens of languages is intractable",
      "Produces stiff, literal phrasing with limited contextual disambiguation",
    ],
    exampleInput: "The student reads a book.",
    exampleOutput: "Le étudiant lit un livre. (literal article mismatch)",
    exampleAnnotation:
      "Without a specific elision rule checking vowel-initial nouns, literal mapping outputs 'Le étudiant' instead of 'L'étudiant'.",
    diagramSteps: [
      { label: "Source Text", detail: "The student reads a book" },
      { label: "POS Tagging", detail: "DET N V DET N" },
      { label: "Bilingual Lexicon", detail: "The→Le, student→étudiant" },
      { label: "Transfer Rules", detail: "SVO → SVO + Gender lookup" },
      { label: "Literal Output", detail: "Rigid rule-matched target" },
    ],
  },
  {
    id: "smt",
    code: "Generation II",
    title: "Statistical Machine Translation (SMT)",
    era: "1990s – 2016",
    accent: "#FBBC05",
    tagline: "Probabilistic phrase alignment learned from parallel corpora.",
    architecture:
      "Noisy-Channel Bayesian Framework: Translation Model P(f|e) × Language Model P(e) searched via Beam Decoding.",
    howItWorks:
      "Instead of hand-coded rules, SMT analyzes millions of previously translated sentence pairs (parallel corpora). It builds phrase tables recording how often source phrases map to target phrases, then scores candidate translations using an n-gram target language model for fluency.",
    advantages: [
      "Data-driven: adapts to new language pairs whenever parallel texts exist",
      "Captures multi-word idioms better than word-by-word RBMT",
      "Powered Google Translate's initial global launch in 2006",
    ],
    limitations: [
      "Local n-gram window struggles with long-range grammatical agreement",
      "Word reordering across distant clauses (e.g., English SVO to Tamil SOV) is brittle",
      "Requires separate feature engineering for alignment, distortion, and language models",
    ],
    exampleInput: "The student reads a book.",
    exampleOutput: "L'étudiant lit un livre.",
    exampleAnnotation:
      "Phrase table maps [The student] → [L'étudiant] (P=0.84) and [reads a book] → [lit un livre] (P=0.79); local phrasing succeeds, though complex nested clauses often fracture.",
    diagramSteps: [
      { label: "Parallel Corpus", detail: "Millions of aligned sentences" },
      { label: "Phrase Table", detail: "P(L'étudiant | The student) = 0.84" },
      { label: "Reordering Model", detail: "Local distortion probability" },
      { label: "N-gram LM", detail: "P(lit un livre) fluency score" },
      { label: "Argmax Search", detail: "Highest-probability phrase chain" },
    ],
  },
  {
    id: "nmt",
    code: "Generation III",
    title: "Neural Machine Translation (NMT)",
    era: "2016 – Present",
    accent: "#4285F4",
    tagline: "End-to-end deep neural networks with attention & Transformers.",
    architecture:
      "Continuous Vector Space Encoder–Decoder: Subword Tokenization → Positional Embeddings → Multi-Head Self-Attention → Autoregressive Decoding.",
    howItWorks:
      "A single unified neural network encodes the entire source sentence into high-dimensional contextual vectors. Attention mechanisms dynamically weigh relationships between all words—regardless of distance—before the decoder generates the target sentence token by token.",
    advantages: [
      "Captures global sentence context and long-distance dependencies",
      "Produces dramatically higher fluency and natural morphology",
      "Enables multilingual shared representations and zero-shot transfer",
    ],
    limitations: [
      "Computationally intensive training requiring specialized accelerators",
      "Can hallucinate fluent but inaccurate text on out-of-domain inputs",
      "Quality drops sharply for low-resource languages lacking parallel data",
    ],
    exampleInput: "The student reads a book.",
    exampleOutput: "L'étudiant lit un livre. / மாணவர் ஒரு புத்தகத்தை படிக்கிறார்.",
    exampleAnnotation:
      "Continuous representations preserve subject-verb agreement, elision, and full SOV reordering in Tamil within a unified vector manifold.",
    diagramSteps: [
      { label: "Subword Tokens", detail: "['The', 'student', 'reads', ...]" },
      { label: "Vector Embeddings", detail: "512-dim dense representations" },
      { label: "Self-Attention", detail: "Global pairwise context weights" },
      { label: "Cross-Attention", detail: "Source-to-target alignment" },
      { label: "Fluent Output", detail: "Probability distribution over vocab" },
    ],
  },
];

export interface PipelinePreset {
  id: string;
  targetLanguage: string;
  targetCode: string;
  sourceSentence: string;
  detectedLang: string;
  confidence: string;
  tokens: { text: string; id: number }[];
  embeddingsSample: { token: string; vector: number[]; pos: number }[];
  encoderSummary: string;
  attentionPairs: { source: string; target: string; weight: number }[];
  decoderSteps: { step: number; generated: string; topCandidates: { token: string; prob: number }[] }[];
  finalOutput: string;
  linguisticNote: string;
}

export const PIPELINE_PRESETS: Record<string, PipelinePreset> = {
  fr: {
    id: "fr",
    targetLanguage: "French",
    targetCode: "FR",
    sourceSentence: "The student reads a book.",
    detectedLang: "English (en)",
    confidence: "99.4%",
    tokens: [
      { text: "The", id: 104 },
      { text: "student", id: 2481 },
      { text: "reads", id: 5892 },
      { text: "a", id: 42 },
      { text: "book", id: 1307 },
      { text: ".", id: 4 },
    ],
    embeddingsSample: [
      { token: "The", pos: 0, vector: [0.14, -0.52, 0.88, 0.03] },
      { token: "student", pos: 1, vector: [0.76, 0.31, -0.19, 0.64] },
      { token: "reads", pos: 2, vector: [-0.41, 0.83, 0.27, -0.11] },
      { token: "a", pos: 3, vector: [0.09, -0.48, 0.72, 0.15] },
      { token: "book", pos: 4, vector: [0.69, 0.44, -0.35, 0.58] },
    ],
    encoderSummary:
      "6 stacked encoder layers refine each token vector so 'reads' encodes its singular subject ('student') and object ('book').",
    attentionPairs: [
      { source: "reads", target: "student", weight: 0.44 },
      { source: "reads", target: "book", weight: 0.39 },
      { source: "The", target: "student", weight: 0.62 },
      { source: "a", target: "book", weight: 0.57 },
    ],
    decoderSteps: [
      {
        step: 1,
        generated: "L'",
        topCandidates: [
          { token: "L'", prob: 0.89 },
          { token: "Le", prob: 0.07 },
          { token: "Un", prob: 0.03 },
        ],
      },
      {
        step: 2,
        generated: "étudiant",
        topCandidates: [
          { token: "étudiant", prob: 0.91 },
          { token: "élève", prob: 0.06 },
          { token: "étudiante", prob: 0.02 },
        ],
      },
      {
        step: 3,
        generated: "lit",
        topCandidates: [
          { token: "lit", prob: 0.94 },
          { token: "lis", prob: 0.03 },
          { token: "étudie", prob: 0.02 },
        ],
      },
      {
        step: 4,
        generated: "un",
        topCandidates: [
          { token: "un", prob: 0.92 },
          { token: "le", prob: 0.05 },
          { token: "une", prob: 0.02 },
        ],
      },
      {
        step: 5,
        generated: "livre.",
        topCandidates: [
          { token: "livre", prob: 0.96 },
          { token: "roman", prob: 0.02 },
          { token: "texte", prob: 0.01 },
        ],
      },
    ],
    finalOutput: "L'étudiant lit un livre.",
    linguisticNote:
      "Both English and French follow SVO word order, while French applies vowel elision ('Le' + 'étudiant' → 'L'étudiant') and masculine article agreement ('un livre').",
  },
  ta: {
    id: "ta",
    targetLanguage: "Tamil",
    targetCode: "TA",
    sourceSentence: "The student reads a book.",
    detectedLang: "English (en)",
    confidence: "99.4%",
    tokens: [
      { text: "The", id: 104 },
      { text: "student", id: 2481 },
      { text: "reads", id: 5892 },
      { text: "a", id: 42 },
      { text: "book", id: 1307 },
      { text: ".", id: 4 },
    ],
    embeddingsSample: [
      { token: "The", pos: 0, vector: [0.14, -0.52, 0.88, 0.03] },
      { token: "student", pos: 1, vector: [0.76, 0.31, -0.19, 0.64] },
      { token: "reads", pos: 2, vector: [-0.41, 0.83, 0.27, -0.11] },
      { token: "a", pos: 3, vector: [0.09, -0.48, 0.72, 0.15] },
      { token: "book", pos: 4, vector: [0.69, 0.44, -0.35, 0.58] },
    ],
    encoderSummary:
      "Contextual encoding captures the semantic roles (Agent: student, Action: reads, Patient: book) independent of English word order.",
    attentionPairs: [
      { source: "student", target: "reads", weight: 0.48 },
      { source: "book", target: "reads", weight: 0.41 },
      { source: "a", target: "book", weight: 0.57 },
      { source: "reads", target: "book", weight: 0.39 },
    ],
    decoderSteps: [
      {
        step: 1,
        generated: "மாணவர்",
        topCandidates: [
          { token: "மாணவர்", prob: 0.84 },
          { token: "மாணவன்", prob: 0.11 },
          { token: "மாணவி", prob: 0.04 },
        ],
      },
      {
        step: 2,
        generated: "ஒரு",
        topCandidates: [
          { token: "ஒரு", prob: 0.90 },
          { token: "அந்த", prob: 0.06 },
          { token: "புத்தக", prob: 0.02 },
        ],
      },
      {
        step: 3,
        generated: "புத்தகத்தை",
        topCandidates: [
          { token: "புத்தகத்தை", prob: 0.88 },
          { token: "நூலை", prob: 0.08 },
          { token: "புத்தகம்", prob: 0.03 },
        ],
      },
      {
        step: 4,
        generated: "படிக்கிறார்.",
        topCandidates: [
          { token: "படிக்கிறார்", prob: 0.86 },
          { token: "வாசிக்கிறார்", prob: 0.09 },
          { token: "படிக்கிறான்", prob: 0.03 },
        ],
      },
    ],
    finalOutput: "மாணவர் ஒரு புத்தகத்தை படிக்கிறார்.",
    linguisticNote:
      "Cross-attention reorders English SVO ('reads a book') into Tamil SOV ('ஒரு புத்தகத்தை படிக்கிறார்') and inflects 'book' with the accusative suffix '-ஐ' (-ai).",
  },
  hi: {
    id: "hi",
    targetLanguage: "Hindi",
    targetCode: "HI",
    sourceSentence: "The student reads a book.",
    detectedLang: "English (en)",
    confidence: "99.4%",
    tokens: [
      { text: "The", id: 104 },
      { text: "student", id: 2481 },
      { text: "reads", id: 5892 },
      { text: "a", id: 42 },
      { text: "book", id: 1307 },
      { text: ".", id: 4 },
    ],
    embeddingsSample: [
      { token: "The", pos: 0, vector: [0.14, -0.52, 0.88, 0.03] },
      { token: "student", pos: 1, vector: [0.76, 0.31, -0.19, 0.64] },
      { token: "reads", pos: 2, vector: [-0.41, 0.83, 0.27, -0.11] },
      { token: "a", pos: 3, vector: [0.09, -0.48, 0.72, 0.15] },
      { token: "book", pos: 4, vector: [0.69, 0.44, -0.35, 0.58] },
    ],
    encoderSummary:
      "Encoder states fuse 'reads' (present habitual aspect) with 'student' and 'book' into a language-neutral latent sequence.",
    attentionPairs: [
      { source: "reads", target: "student", weight: 0.46 },
      { source: "reads", target: "book", weight: 0.42 },
      { source: "a", target: "book", weight: 0.55 },
      { source: "The", target: "student", weight: 0.59 },
    ],
    decoderSteps: [
      {
        step: 1,
        generated: "छात्र",
        topCandidates: [
          { token: "छात्र", prob: 0.83 },
          { token: "विद्यार्थी", prob: 0.13 },
          { token: "छात्रा", prob: 0.03 },
        ],
      },
      {
        step: 2,
        generated: "एक",
        topCandidates: [
          { token: "एक", prob: 0.91 },
          { token: "वह", prob: 0.05 },
          { token: "किताब", prob: 0.02 },
        ],
      },
      {
        step: 3,
        generated: "किताब",
        topCandidates: [
          { token: "किताब", prob: 0.87 },
          { token: "पुस्तक", prob: 0.10 },
          { token: "ग्रंथ", prob: 0.02 },
        ],
      },
      {
        step: 4,
        generated: "पढ़ता है।",
        topCandidates: [
          { token: "पढ़ता है", prob: 0.88 },
          { token: "पढ़ती है", prob: 0.07 },
          { token: "पढ़ रहा है", prob: 0.03 },
        ],
      },
    ],
    finalOutput: "छात्र एक किताब पढ़ता है।",
    linguisticNote:
      "Hindi shifts from SVO to SOV order and selects the habitual verb construction 'पढ़ता है' (padhta hai) matching the masculine singular subject.",
  },
};

export interface PipelineStageInfo {
  id: string;
  index: number;
  name: string;
  shortName: string;
  accent: string;
  purpose: string;
  internalProcess: string;
  inputRepr: string;
  outputRepr: string;
  qualityRole: string;
}

export const PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    id: "input",
    index: 1,
    name: "Input Acquisition",
    shortName: "Input",
    accent: "#4285F4",
    purpose: "Normalizes raw user text, audio transcripts, or OCR characters into canonical Unicode.",
    internalProcess:
      "Applies Unicode normalization (NFKC), strips extraneous control bytes, segments paragraphs into sentences, and preserves punctuation boundaries.",
    inputRepr: 'Raw UTF-8 character stream: "The student reads a book."',
    outputRepr: "Normalized string segment ready for language classification.",
    qualityRole:
      "Prevents encoding mismatches (e.g., lookalike characters or broken diacritics) from corrupting downstream vocabulary lookups.",
  },
  {
    id: "detection",
    index: 2,
    name: "Language Detection",
    shortName: "Detect",
    accent: "#EA4335",
    purpose: "Identifies the source language and script before routing to the translation model.",
    internalProcess:
      "Uses fast character n-gram classifiers and script-range histograms (e.g., Latin vs. Devanagari vs. Tamil script) to output a probability distribution over supported languages.",
    inputRepr: "Normalized Unicode string",
    outputRepr: "Language tag <en> (Confidence: 99.4%) + script metadata",
    qualityRole:
      "Selects the correct language-pair token prefix in multilingual NMT models; misdetection causes catastrophic wrong-language decoding.",
  },
  {
    id: "tokenization",
    index: 3,
    name: "Subword Tokenization",
    shortName: "Tokenize",
    accent: "#FBBC05",
    purpose: "Splits text into discrete subword units using Byte-Pair Encoding (BPE) or SentencePiece.",
    internalProcess:
      "Breaks common words into whole tokens and rare or compound words into meaningful subword pieces (e.g., 'unbelievable' → ['un', 'believ', 'able']), mapping each to a fixed integer ID.",
    inputRepr: '"The student reads a book."',
    outputRepr: 'Tokens: ["The", "student", "reads", "a", "book", "."] → IDs: [104, 2481, 5892, 42, 1307, 4]',
    qualityRole:
      "Eliminates out-of-vocabulary ('<UNK>') failures while keeping the vocabulary compact (typically 32k–256k tokens).",
  },
  {
    id: "embedding",
    index: 4,
    name: "Token Embedding + Position",
    shortName: "Embed",
    accent: "#34A853",
    purpose: "Maps discrete integer IDs into continuous d-dimensional semantic vectors with word-order signals.",
    internalProcess:
      "Looks up each token ID in a learned embedding matrix E ∈ ℝ^(V×d_model) and adds sinusoidal or learned positional encodings so the model knows token index order.",
    inputRepr: "Token ID sequence [104, 2481, 5892, 42, 1307, 4]",
    outputRepr: "Matrix X ∈ ℝ^(6 × 512) of dense floating-point vectors",
    qualityRole:
      "Encodes semantic similarity geometrically—words like 'reads' and 'writes' cluster near each other before context layers even run.",
  },
  {
    id: "encoder",
    index: 5,
    name: "Transformer Encoder Stack",
    shortName: "Encoder",
    accent: "#4285F4",
    purpose: "Transforms static word embeddings into deep, context-aware representations of the entire source sentence.",
    internalProcess:
      "Passes the embedding matrix through N identical layers (typically 6), each combining bidirectional multi-head self-attention, residual skip connections, layer normalization, and a feed-forward network.",
    inputRepr: "Positional embedding matrix X ∈ ℝ^(6 × 512)",
    outputRepr: "Contextual memory tensor H_enc ∈ ℝ^(6 × 512)",
    qualityRole:
      "Disambiguates polysemous words (like 'bank' or 'reads') using full bidirectional left-and-right sentence context.",
  },
  {
    id: "attention",
    index: 6,
    name: "Self & Cross-Attention",
    shortName: "Attention",
    accent: "#EA4335",
    purpose: "Computes dynamic relevance weights connecting every token to every other token across source and target.",
    internalProcess:
      "Projects representations into Query (Q), Key (K), and Value (V) vectors, computing scaled dot-product weights: softmax(QK^T / √d_k)V.",
    inputRepr: "Hidden states Q, K, V ∈ ℝ^(seq_len × d_k)",
    outputRepr: "Weighted context vectors + alignment matrix A ∈ [0,1]^(L_tgt × L_src)",
    qualityRole:
      "Solves long-range dependencies and non-monotonic word reordering (such as English SVO to Tamil or Hindi SOV).",
  },
  {
    id: "decoder",
    index: 7,
    name: "Autoregressive Decoder",
    shortName: "Decoder",
    accent: "#FBBC05",
    purpose: "Generates target-language tokens sequentially, conditioning on both prior target tokens and encoder memory.",
    internalProcess:
      "Uses causal (masked) self-attention over previously generated target tokens, cross-attention over H_enc, and a linear + softmax head with beam search to select high-probability sequences.",
    inputRepr: "Start token <bos> + Encoder memory H_enc",
    outputRepr: "Step-by-step token probability distributions over target vocabulary",
    qualityRole:
      "Enforces target-language grammatical agreement, morphology, and fluent phrasing one subword step at a time.",
  },
  {
    id: "output",
    index: 8,
    name: "Detokenization & Output",
    shortName: "Output",
    accent: "#34A853",
    purpose: "Reassembles generated subword tokens into clean, readable target-language text.",
    internalProcess:
      "Halts when the end-of-sequence (<eos>) token is predicted, merges subword markers back into full words, and restores target punctuation and spacing rules.",
    inputRepr: 'Target token ID sequence ending in <eos>',
    outputRepr: 'French: "L\'étudiant lit un livre." | Tamil: "மாணவர் ஒரு புத்தகத்தை படிக்கிறார்."',
    qualityRole:
      "Ensures proper orthography, spacing, and script-specific ligatures reach the end user cleanly.",
  },
];

export interface TransformerBlockSpec {
  id: string;
  label: string;
  zone: "input" | "encoder" | "decoder" | "output";
  accent: string;
  formula: string;
  tensorShape: string;
  summary: string;
  mechanism: string;
  whyItMatters: string;
}

export const TRANSFORMER_BLOCKS: TransformerBlockSpec[] = [
  {
    id: "source",
    label: "Source Sentence",
    zone: "input",
    accent: "#4285F4",
    formula: "S = (w₁, w₂, …, wₙ)",
    tensorShape: "String → [n] Subword IDs",
    summary: "Subword token sequence entered into the source pathway.",
    mechanism:
      "Byte-Pair Encoding or SentencePiece splits text into subword IDs so rare words decompose into known morphemes without losing stem meaning.",
    whyItMatters:
      "Allows fixed-size neural vocabularies (e.g. 32,000 tokens) to represent virtually any word across scripts.",
  },
  {
    id: "embeddings",
    label: "Input Embeddings + Positional Encoding",
    zone: "input",
    accent: "#FBBC05",
    formula: "Z₀ = E(x) · √d_model + PE(pos)",
    tensorShape: "[n, 512]",
    summary: "Injects semantic vector meaning and deterministic sequence position.",
    mechanism:
      "Because attention processes all tokens in parallel rather than sequentially like RNNs, sinusoidal waves PE(pos, 2i) = sin(pos / 10000^(2i/d)) encode relative word distances.",
    whyItMatters:
      "Without positional encoding, 'dog bites man' and 'man bites dog' would yield identical attention outputs.",
  },
  {
    id: "encoder-stack",
    label: "Encoder Stack (N = 6 Layers)",
    zone: "encoder",
    accent: "#4285F4",
    formula: "H_enc = LayerNorm(x + Sublayer(x)) × N",
    tensorShape: "[n, 512] → [n, 512]",
    summary: "Bidirectional contextual feature extractor over the source sentence.",
    mechanism:
      "Each encoder layer pairs Multi-Head Self-Attention with a Position-Wise Feed-Forward Network, stabilized by Residual Skip Connections (x + Sublayer(x)) and Layer Normalization.",
    whyItMatters:
      "Residual connections prevent vanishing gradients in deep stacks, while LayerNorm stabilizes activation scales across variable-length sentences.",
  },
  {
    id: "multi-head",
    label: "Multi-Head Self-Attention",
    zone: "encoder",
    accent: "#EA4335",
    formula: "MultiHead(Q,K,V) = Concat(head₁,…,headₕ)Wᴼ",
    tensorShape: "8 heads × [n, 64] → [n, 512]",
    summary: "Runs parallel attention subspaces to capture syntax, coreference, and semantics simultaneously.",
    mechanism:
      "Linear projections split d_model=512 into h=8 heads of d_k=64. One head may track subject–verb agreement while another resolves pronoun coreference or modifier attachment.",
    whyItMatters:
      "A single attention map averages competing relationships; multiple heads preserve distinct syntactic and semantic dependencies.",
  },
  {
    id: "ffn",
    label: "Feed-Forward Network + Residual & LayerNorm",
    zone: "encoder",
    accent: "#34A853",
    formula: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂",
    tensorShape: "[n, 512] → [n, 2048] → [n, 512]",
    summary: "Applies non-linear feature transformation independently at each token position.",
    mechanism:
      "Expands each token's 512-dim vector to a 2048-dim hidden layer via ReLU/GELU activation and projects back to 512 dims, wrapped in residual addition and LayerNorm.",
    whyItMatters:
      "Acts as key-value associative memory inside the Transformer, enriching token representations between attention mixing steps.",
  },
  {
    id: "decoder-stack",
    label: "Decoder Stack (Masked + Cross-Attention)",
    zone: "decoder",
    accent: "#FBBC05",
    formula: "CrossAttn(Q_dec, K_enc, V_enc)",
    tensorShape: "[m, 512] attending to [n, 512]",
    summary: "Generates target tokens while attending to both prior target words and encoder memory.",
    mechanism:
      "Contains three sublayers: (1) Masked Self-Attention (-∞ mask prevents peeking at future target tokens), (2) Encoder–Decoder Cross-Attention querying H_enc, and (3) Feed-Forward Network.",
    whyItMatters:
      "Causal masking allows parallel teacher-forced training while enforcing strictly left-to-right autoregressive generation at inference.",
  },
  {
    id: "probabilities",
    label: "Output Linear Projection & Softmax",
    zone: "output",
    accent: "#34A853",
    formula: "P(yₜ | y<ₜ, x) = softmax(H_dec · W_vocab)",
    tensorShape: "[m, 512] → [m, |V|]",
    summary: "Converts final decoder hidden states into calibrated next-token probabilities.",
    mechanism:
      "A learned linear layer projects each 512-dim decoder vector to vocabulary logits (e.g., 32,000+ tokens), and Softmax normalizes scores to sum to 1.0.",
    whyItMatters:
      "Enables Beam Search to explore top-k translation hypotheses instead of myopically picking only the single greedy word.",
  },
  {
    id: "target",
    label: "Target Sentence",
    zone: "output",
    accent: "#34A853",
    formula: "Y* = argmax_Y log P(Y | X)",
    tensorShape: "[m] Target Tokens → Detokenized String",
    summary: "Final fluent target-language translation emitted upon <eos>.",
    mechanism:
      "Length-normalized beam search selects the highest-scoring complete sequence and detokenizes subwords into natural target orthography.",
    whyItMatters:
      "Length penalty prevents the decoder from unfairly preferring overly short translations.",
  },
];

export interface AttentionSentenceScenario {
  id: "tired" | "wide";
  label: string;
  tokens: string[];
  /** Matrix[queryIndex][keyIndex] summing to ~1.0 per row */
  weights: number[][];
  highlightWordIndex: number;
  resolvedTargetIndex: number;
  explanation: string;
}

export const ATTENTION_SCENARIOS: AttentionSentenceScenario[] = [
  {
    id: "tired",
    label: 'Ending: "...because it was tired."',
    tokens: ["The", "animal", "did", "not", "cross", "the", "road", "because", "it", "was", "tired", "."],
    highlightWordIndex: 8,
    resolvedTargetIndex: 1,
    explanation:
      'When querying from "it" (index 8), semantic compatibility with "tired" shifts attention strongly onto "animal" (0.58) rather than "road" (0.06).',
    weights: [
      [0.34, 0.52, 0.02, 0.02, 0.04, 0.01, 0.02, 0.01, 0.01, 0.00, 0.01, 0.00], // The
      [0.14, 0.36, 0.05, 0.04, 0.21, 0.01, 0.06, 0.02, 0.05, 0.01, 0.04, 0.01], // animal
      [0.02, 0.18, 0.26, 0.29, 0.18, 0.01, 0.03, 0.01, 0.01, 0.00, 0.01, 0.00], // did
      [0.01, 0.10, 0.24, 0.31, 0.25, 0.01, 0.03, 0.02, 0.01, 0.01, 0.01, 0.00], // not
      [0.02, 0.26, 0.09, 0.14, 0.20, 0.02, 0.22, 0.02, 0.01, 0.00, 0.01, 0.01], // cross
      [0.02, 0.02, 0.01, 0.01, 0.05, 0.31, 0.53, 0.02, 0.01, 0.00, 0.01, 0.01], // the
      [0.01, 0.05, 0.02, 0.02, 0.24, 0.15, 0.39, 0.03, 0.04, 0.01, 0.03, 0.01], // road
      [0.01, 0.11, 0.05, 0.07, 0.16, 0.02, 0.09, 0.22, 0.11, 0.05, 0.10, 0.01], // because
      [0.03, 0.58, 0.02, 0.02, 0.05, 0.01, 0.06, 0.04, 0.08, 0.03, 0.08, 0.00], // it -> animal (0.58)
      [0.01, 0.19, 0.04, 0.03, 0.04, 0.01, 0.04, 0.04, 0.25, 0.16, 0.18, 0.01], // was
      [0.01, 0.34, 0.02, 0.04, 0.05, 0.01, 0.03, 0.06, 0.23, 0.08, 0.12, 0.01], // tired
      [0.04, 0.14, 0.04, 0.04, 0.12, 0.03, 0.11, 0.07, 0.09, 0.06, 0.10, 0.16], // .
    ],
  },
  {
    id: "wide",
    label: 'Ending: "...because it was wide."',
    tokens: ["The", "animal", "did", "not", "cross", "the", "road", "because", "it", "was", "wide", "."],
    highlightWordIndex: 8,
    resolvedTargetIndex: 6,
    explanation:
      'Changing just the final adjective from "tired" to "wide" causes self-attention from "it" (index 8) to pivot onto "road" (0.56) instead of "animal" (0.07).',
    weights: [
      [0.34, 0.52, 0.02, 0.02, 0.04, 0.01, 0.02, 0.01, 0.01, 0.00, 0.01, 0.00],
      [0.14, 0.37, 0.05, 0.04, 0.22, 0.01, 0.07, 0.02, 0.03, 0.01, 0.03, 0.01],
      [0.02, 0.18, 0.26, 0.29, 0.18, 0.01, 0.03, 0.01, 0.01, 0.00, 0.01, 0.00],
      [0.01, 0.10, 0.24, 0.31, 0.25, 0.01, 0.03, 0.02, 0.01, 0.01, 0.01, 0.00],
      [0.02, 0.24, 0.09, 0.14, 0.20, 0.02, 0.24, 0.02, 0.01, 0.00, 0.01, 0.01],
      [0.02, 0.02, 0.01, 0.01, 0.05, 0.31, 0.53, 0.02, 0.01, 0.00, 0.01, 0.01],
      [0.01, 0.05, 0.02, 0.02, 0.21, 0.16, 0.35, 0.03, 0.07, 0.02, 0.05, 0.01],
      [0.01, 0.09, 0.05, 0.07, 0.16, 0.02, 0.13, 0.22, 0.11, 0.04, 0.09, 0.01],
      [0.01, 0.07, 0.02, 0.02, 0.05, 0.03, 0.56, 0.04, 0.08, 0.03, 0.09, 0.00], // it -> road (0.56)
      [0.01, 0.05, 0.04, 0.03, 0.04, 0.02, 0.23, 0.04, 0.24, 0.14, 0.15, 0.01],
      [0.01, 0.04, 0.02, 0.03, 0.06, 0.03, 0.36, 0.05, 0.22, 0.07, 0.10, 0.01],
      [0.04, 0.13, 0.04, 0.04, 0.12, 0.03, 0.14, 0.07, 0.09, 0.05, 0.09, 0.16],
    ],
  },
];

export interface CoreComponentSpec {
  id: string;
  name: string;
  accent: string;
  definition: string;
  functionDesc: string;
  diagramType: "tokenization" | "embedding" | "positional" | "self-attention" | "multi-head" | "encoder" | "decoder" | "ffn";
  exampleTitle: string;
  exampleCode: string;
}

export const CORE_COMPONENTS: CoreComponentSpec[] = [
  {
    id: "tokenization",
    name: "Subword Tokenization",
    accent: "#4285F4",
    definition: "Algorithmic segmentation of raw text into frequent words and reusable subword units (BPE, WordPiece, SentencePiece).",
    functionDesc: "Balances vocabulary size against sequence length while handling unseen compounds, inflections, and cross-script text.",
    diagramType: "tokenization",
    exampleTitle: "Morphological Split",
    exampleCode: '"untranslatable" → ["▁un", "trans", "lat", "able"] → [412, 1894, 920, 615]',
  },
  {
    id: "embeddings",
    name: "Word Embeddings",
    accent: "#34A853",
    definition: "Learned dense lookup vectors mapping discrete token IDs into continuous d-dimensional Euclidean space.",
    functionDesc: "Encodes semantic and syntactic proximity geometrically so related concepts share directional structure.",
    diagramType: "embedding",
    exampleTitle: "Semantic Vector Arithmetic",
    exampleCode: "vec('king') - vec('man') + vec('woman') ≈ vec('queen') (d = 512)",
  },
  {
    id: "positional",
    name: "Positional Encoding",
    accent: "#FBBC05",
    definition: "Deterministic sinusoidal (or relative) signals added to token embeddings to inject sequence order.",
    functionDesc: "Enables self-attention—an inherently permutation-equivariant set operation—to distinguish word positions and distances.",
    diagramType: "positional",
    exampleTitle: "Sinusoidal Basis",
    exampleCode: "PE(pos, 2i) = sin(pos / 10000^(2i/512)), PE(pos, 2i+1) = cos(...)",
  },
  {
    id: "self-attention",
    name: "Self-Attention",
    accent: "#EA4335",
    definition: "Scaled dot-product mechanism computing pairwise relevance between all tokens inside a single sequence.",
    functionDesc: "Creates direct O(1) path-length connections between distant words, resolving pronouns and verb-argument structure.",
    diagramType: "self-attention",
    exampleTitle: "Scaled Dot-Product",
    exampleCode: "Attention(Q, K, V) = softmax((Q · Kᵀ) / √d_k) · V",
  },
  {
    id: "multi-head",
    name: "Multi-Head Attention",
    accent: "#4285F4",
    definition: "Parallel execution of h independent attention heads across lower-dimensional learned projections.",
    functionDesc: "Allows the model to attend simultaneously to syntactic roles, coreference links, and semantic modifiers.",
    diagramType: "multi-head",
    exampleTitle: "8 Parallel Subspaces",
    exampleCode: "d_model = 512 → 8 heads × d_k = 64 → Concat + Wᴼ projection",
  },
  {
    id: "encoder",
    name: "Encoder",
    accent: "#4285F4",
    definition: "Stack of bidirectional Transformer blocks transforming source embeddings into contextualized hidden states.",
    functionDesc: "Builds a unified semantic memory tensor H_enc where every token representation reflects full-sentence context.",
    diagramType: "encoder",
    exampleTitle: "Bidirectional Context",
    exampleCode: 'In "river bank" vs "bank account", H_enc("bank") diverges cleanly.',
  },
  {
    id: "decoder",
    name: "Decoder",
    accent: "#34A853",
    definition: "Autoregressive Transformer stack generating target tokens using masked self-attention and cross-attention.",
    functionDesc: "Conditioned on H_enc and previously emitted target tokens y₁…yₜ₋₁, predicts P(yₜ | y<ₜ, X).",
    diagramType: "decoder",
    exampleTitle: "Causal Masking",
    exampleCode: "Mask[i, j] = -∞ for j > i (prevents attending to future target tokens)",
  },
  {
    id: "ffn",
    name: "Feed-Forward Networks",
    accent: "#FBBC05",
    definition: "Two-layer fully connected MLP with non-linear activation applied identically to each token position.",
    functionDesc: "Expands representation dimensionality (typically 4× d_model) to process and store factual/linguistic patterns per token.",
    diagramType: "ffn",
    exampleTitle: "Position-Wise Expansion",
    exampleCode: "512 dims → Linear + ReLU (2048 dims) → Linear (512 dims)",
  },
];

export interface LabPresetTranslation {
  sourceSentence: string;
  translations: Record<
    string,
    {
      translatedText: string;
      targetTokens: string[];
      note: string;
    }
  >;
}

export const LAB_LANGUAGES = [
  { code: "English", label: "English" },
  { code: "French", label: "French" },
  { code: "Tamil", label: "Tamil" },
  { code: "Hindi", label: "Hindi" },
  { code: "Spanish", label: "Spanish" },
  { code: "German", label: "German" },
];

export const LAB_PRESETS: LabPresetTranslation[] = [
  {
    sourceSentence: "The student reads a book.",
    translations: {
      French: {
        translatedText: "L'étudiant lit un livre.",
        targetTokens: ["L'", "étudiant", "lit", "un", "livre", "."],
        note: "SVO order preserved; vowel elision merges 'Le' + 'étudiant' into 'L'étudiant'.",
      },
      Tamil: {
        translatedText: "மாணவர் ஒரு புத்தகத்தை படிக்கிறார்.",
        targetTokens: ["மாணவர்", "ஒரு", "புத்தகத்தை", "படிக்கிறார்", "."],
        note: "Shifts from English SVO to Tamil SOV with accusative suffix '-ஐ' on 'book'.",
      },
      Hindi: {
        translatedText: "छात्र एक किताब पढ़ता है।",
        targetTokens: ["छात्र", "एक", "किताब", "पढ़ता", "है", "।"],
        note: "Shifts to SOV word order with present habitual auxiliary 'पढ़ता है'.",
      },
      Spanish: {
        translatedText: "El estudiante lee un libro.",
        targetTokens: ["El", "estudiante", "lee", "un", "libro", "."],
        note: "Direct SVO mapping with masculine definite and indefinite articles.",
      },
      German: {
        translatedText: "Der Student liest ein Buch.",
        targetTokens: ["Der", "Student", "liest", "ein", "Buch", "."],
        note: "Preserves V2 main-clause verb placement; 'Buch' takes neuter article 'ein'.",
      },
      English: {
        translatedText: "The student reads a book.",
        targetTokens: ["The", "student", "reads", "a", "book", "."],
        note: "Identity mapping when source and target languages match.",
      },
    },
  },
  {
    sourceSentence: "Artificial intelligence is changing the world.",
    translations: {
      French: {
        translatedText: "L'intelligence artificielle change le monde.",
        targetTokens: ["L'", "intelligence", "artificielle", "change", "le", "monde", "."],
        note: "Adjective placement reverses ('Artificial intelligence' → 'intelligence artificielle') to follow French noun-adjective syntax.",
      },
      Tamil: {
        translatedText: "செயற்கை நுண்ணறிவு உலகை மாற்றுகிறது.",
        targetTokens: ["செயற்கை", "நுண்ணறிவு", "உலகை", "மாற்றுகிறது", "."],
        note: "Compound noun phrase 'செயற்கை நுண்ணறிவு' precedes accusative object 'உலகை' and final verb 'மாற்றுகிறது'.",
      },
      Hindi: {
        translatedText: "कृत्रिम बुद्धिमत्ता दुनिया को बदल रही है।",
        targetTokens: ["कृत्रिम", "बुद्धिमत्ता", "दुनिया", "को", "बदल", "रही", "है", "।"],
        note: "Feminine noun 'बुद्धिमत्ता' triggers feminine progressive inflection 'बदल रही है'.",
      },
      Spanish: {
        translatedText: "La inteligencia artificial está cambiando el mundo.",
        targetTokens: ["La", "inteligencia", "artificial", "está", "cambiando", "el", "mundo", "."],
        note: "Maintains present continuous aspect ('está cambiando') with post-nominal adjective order.",
      },
      German: {
        translatedText: "Künstliche Intelligenz verändert die Welt.",
        targetTokens: ["Künstliche", "Intelligenz", "verändert", "die", "Welt", "."],
        note: "Zero-article abstract subject paired with present-tense verb in V2 position.",
      },
      English: {
        translatedText: "Artificial intelligence is changing the world.",
        targetTokens: ["Artificial", "intelligence", "is", "changing", "the", "world", "."],
        note: "Identity mapping when source and target languages match.",
      },
    },
  },
  {
    sourceSentence: "Machine translation connects people globally.",
    translations: {
      French: {
        translatedText: "La traduction automatique connecte les gens à l'échelle mondiale.",
        targetTokens: ["La", "traduction", "automatique", "connecte", "les", "gens", "à", "l'échelle", "mondiale", "."],
        note: "Adverb 'globally' expands into the idiomatic prepositional phrase 'à l'échelle mondiale'.",
      },
      Tamil: {
        translatedText: "இயந்திர மொழிபெயர்ப்பு உலகளவில் மக்களை இணைக்கிறது.",
        targetTokens: ["இயந்திர", "மொழிபெயர்ப்பு", "உலகளவில்", "மக்களை", "இணைக்கிறது", "."],
        note: "Locative adverbial 'உலகளவில்' (globally) sits naturally before the object 'மக்களை' (people) and verb.",
      },
      Hindi: {
        translatedText: "मशीनी अनुवाद विश्व स्तर पर लोगों को जोड़ता है।",
        targetTokens: ["मशीनी", "अनुवाद", "विश्व", "स्तर", "पर", "लोगों", "को", "जोड़ता", "है", "।"],
        note: "Postposition 'पर' (on/at) follows 'विश्व स्तर' (global level), illustrating head-final Hindi syntax.",
      },
      Spanish: {
        translatedText: "La traducción automática conecta a las personas a nivel mundial.",
        targetTokens: ["La", "traduction", "automática", "conecta", "a", "las", "personas", "a", "nivel", "mundial", "."],
        note: "Inserts personal 'a' before animate direct object 'las personas'—a rule learned implicitly from parallel corpora.",
      },
      German: {
        translatedText: "Maschinelle Übersetzung verbindet Menschen weltweit.",
        targetTokens: ["Maschinelle", "Übersetzung", "verbindet", "Menschen", "weltweit", "."],
        note: "Compound noun 'Übersetzung' and concise adverb 'weltweit' preserve compact German cadence.",
      },
      English: {
        translatedText: "Machine translation connects people globally.",
        targetTokens: ["Machine", "translation", "connects", "people", "globally", "."],
        note: "Identity mapping when source and target languages match.",
      },
    },
  },
];

export interface CaseStudyMode {
  id: string;
  name: string;
  inputPipeline: string[];
  description: string;
  architectureNote: string;
}

export const GOOGLE_TRANSLATE_MODES: CaseStudyMode[] = [
  {
    id: "text",
    name: "Text Translation",
    inputPipeline: ["Unicode Text", "Script & Lang ID", "Subword Tokenizer", "NMT Model", "Target Text"],
    description:
      "Processes typed or pasted text across 240+ languages, including low-resource pairs enabled by multilingual transfer and zero-shot modeling.",
    architectureNote: "Direct text-to-text Transformer pathway with subword segmentation.",
  },
  {
    id: "voice",
    name: "Voice Translation",
    inputPipeline: ["Audio Waveform", "Streaming ASR", "Transcript Normalization", "NMT Model", "Neural TTS / Text"],
    description:
      "Converts spoken audio into text via Automatic Speech Recognition (ASR), translates the transcript, and optionally synthesizes target speech.",
    architectureNote: "Cascaded ASR → NMT → TTS (or direct speech-to-speech neural models in newer research).",
  },
  {
    id: "camera",
    name: "Camera & OCR",
    inputPipeline: ["Camera Frame", "Text Region Detection", "Optical Character Recognition", "NMT Model", "AR Overlay Inpainting"],
    description:
      "Detects street signs, menus, or printed text in camera frames, extracts characters via OCR, translates them, and renders matched typography back over the image.",
    architectureNote: "Combines computer vision (text detection + OCR + background inpainting) with low-latency NMT.",
  },
  {
    id: "document",
    name: "Document Translation",
    inputPipeline: ["PDF / DOCX", "DOM & Layout Parser", "Segment Extraction", "Batch NMT", "Format Reconstruction"],
    description:
      "Parses structured documents, extracts translatable text spans while preserving XML/layout tags, translates in batches, and rebuilds the original layout.",
    architectureNote: "Tag-aware segmentation preserves tables, headings, and inline formatting.",
  },
  {
    id: "conversation",
    name: "Conversation Mode",
    inputPipeline: ["Dual-Mic Stream", "Turn / Lang Detection", "Streaming ASR", "Context-Aware NMT", "Bilingual Output"],
    description:
      "Listens to alternating speakers in two languages, automatically detects who is speaking which language, and delivers near-real-time bilingual captions and audio.",
    architectureNote: "Low-latency streaming decoding with incremental hypothesis revision.",
  },
];

export interface ChallengeItem {
  id: string;
  title: string;
  accent: string;
  summary: string;
  sourceExample: string;
  contextA: { label: string; translation: string; note: string };
  contextB: { label: string; translation: string; note: string };
}

export const CHALLENGES_LIST: ChallengeItem[] = [
  {
    id: "ambiguity",
    title: "Linguistic Ambiguity & Polysemy",
    accent: "#4285F4",
    summary:
      "Words carry multiple unrelated meanings (lexical ambiguity) or allow multiple parse trees (syntactic ambiguity) that only surrounding context resolves.",
    sourceExample: 'Word: "bank" in an English sentence',
    contextA: {
      label: '"He sat by the river bank."',
      translation: "FR: Il s'est assis au bord de la rivière.",
      note: 'Self-attention links "bank" with "river", selecting "bord" (shore/edge) instead of "banque".',
    },
    contextB: {
      label: '"He walked into the central bank."',
      translation: "FR: Il est entré dans la banque centrale.",
      note: 'Co-occurrence with "central" and "walked into" selects financial "banque".',
    },
  },
  {
    id: "idioms",
    title: "Idioms & Cultural Expressions",
    accent: "#EA4335",
    summary:
      "Figurative expressions cannot be decoded compositionally from word meanings; literal translation destroys intent.",
    sourceExample: '"Break a leg!" before a theater performance',
    contextA: {
      label: "Literal Word-Level Failure",
      translation: 'FR (Literal): "Casse-toi une jambe !"',
      note: "Sounds like a hostile wish for physical injury if translated without pragmatic context.",
    },
    contextB: {
      label: "Culturally Equivalent Target",
      translation: 'FR (Idiomatic): "Bonne chance !" / "Merde !"',
      note: "Requires pragmatic equivalence learned from parallel movie subtitles and conversational corpora.",
    },
  },
  {
    id: "low-resource",
    title: "Low-Resource Languages",
    accent: "#FBBC05",
    summary:
      "While English–French has tens of millions of parallel sentences, thousands of world languages have scarce digital parallel text.",
    sourceExample: "Training corpus scale disparity (Illustrative comparison)",
    contextA: {
      label: "High-Resource (e.g., EN ↔ FR / ES)",
      translation: "10M–100M+ parallel sentences",
      note: "Rich coverage across news, science, law, and colloquial speech yields high fluency and accuracy.",
    },
    contextB: {
      label: "Low-Resource Languages",
      translation: "< 100K parallel sentences",
      note: "Relies on multilingual transfer learning, back-translation, and monolingual self-supervision (e.g., Zero-Shot / Madlad).",
    },
  },
  {
    id: "domain",
    title: "Domain-Specific Terminology",
    accent: "#34A853",
    summary:
      "Medical, legal, and engineering prose assigns precise technical definitions to everyday words.",
    sourceExample: 'Term: "charge" across technical domains',
    contextA: {
      label: "Legal Context: 'The defendant faced a charge.'",
      translation: "FR: L'accusé faisait face à une accusation.",
      note: "Requires legal corpus alignment ('accusation' / 'chef d'inculpation').",
    },
    contextB: {
      label: "Physics Context: 'Measure the electric charge.'",
      translation: "FR: Mesurez la charge électrique.",
      note: "Maps to physical quantity 'charge électrique'; generic models misalign when domain context is absent.",
    },
  },
  {
    id: "context",
    title: "Document-Level & Discourse Context",
    accent: "#4285F4",
    summary:
      "Sentence-by-sentence translation loses cross-sentence pronoun antecedents, speaker formality (tu vs. vous), and narrative tense.",
    sourceExample: 'Isolated sentence: "It was cold."',
    contextA: {
      label: "Referring to 'the soup' (la soupe - fem.)",
      translation: "FR: Elle était froide.",
      note: "Without the preceding sentence mentioning 'soup', a sentence-level model cannot know feminine agreement ('Elle').",
    },
    contextB: {
      label: "Referring to 'the coffee' (le café - masc.)",
      translation: "FR: Il était froid.",
      note: "Requires document-level context windows spanning multiple sentences.",
    },
  },
  {
    id: "bias",
    title: "Bias in Training Data",
    accent: "#EA4335",
    summary:
      "Models absorb statistical stereotypes from web-scraped corpora, defaulting gender-neutral occupational nouns to skewed pronouns.",
    sourceExample: 'Gender-neutral source: Hungarian "Ő egy orvos. Ő egy ápoló."',
    contextA: {
      label: "Historical Biased Output",
      translation: 'EN: "He is a doctor. She is a nurse."',
      note: "Skewed training frequencies forced gender-neutral 'Ő' into stereotypical occupational genders.",
    },
    contextB: {
      label: "Mitigated Dual-Form Output",
      translation: 'EN: "She/He is a doctor." (Gender-aware alternatives)',
      note: "Modern systems provide dual feminine/masculine outputs for ambiguous short queries.",
    },
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the primary purpose of self-attention in a Transformer?",
    options: [
      "To compress the entire sentence into a single fixed-length recurrent hidden state",
      "To compute pairwise relevance weights between all tokens in a sequence simultaneously",
      "To replace subword tokenization with character-by-character ASCII lookup",
      "To eliminate the need for training data using handcrafted grammar rules",
    ],
    correctIndex: 1,
    explanation:
      "Self-attention allows every token to attend directly to every other token in parallel via Query–Key–Value dot products, capturing long-range dependencies in O(1) path length.",
  },
  {
    id: 2,
    question: "Why does the Transformer add Positional Encoding to input embeddings?",
    options: [
      "To reduce the vocabulary size before softmax normalization",
      "Because self-attention is permutation-equivariant and has no inherent sense of word order",
      "To convert target-language words back into source-language tokens",
      "To prevent the encoder from seeing punctuation tokens",
    ],
    correctIndex: 1,
    explanation:
      "Unlike RNNs that process tokens sequentially, self-attention inspects all tokens at once; sinusoidal or learned positional encodings inject token index and relative distance.",
  },
  {
    id: 3,
    question: "Why do modern NMT systems use subword tokenization (like BPE or SentencePiece) instead of pure word-level vocabularies?",
    options: [
      "It guarantees 100% BLEU score on all low-resource languages",
      "It eliminates out-of-vocabulary (<UNK>) failures by splitting rare words into known morphemes",
      "It removes the need for a decoder stack during inference",
      "It forces all languages into English SVO word order",
    ],
    correctIndex: 1,
    explanation:
      "Subword tokenization keeps the vocabulary compact (e.g., 32k–256k units) while allowing unseen compound or inflected words to be represented as reusable subword pieces.",
  },
  {
    id: 4,
    question: "In the Transformer Decoder, why is causal masking (-∞ above the diagonal) applied to target self-attention?",
    options: [
      "To speed up GPU matrix multiplication by deleting half the parameters",
      "To prevent the decoder from peeking at future target tokens during training",
      "To force the encoder to ignore stopwords like 'the' and 'a'",
      "To convert English nouns into French masculine gender",
    ],
    correctIndex: 1,
    explanation:
      "During parallel training with ground-truth target sequences, causal masking ensures position t can only attend to positions ≤ t, preserving autoregressive generation validity.",
  },
  {
    id: 5,
    question: "How did Google's 2016 GNMT adoption differ fundamentally from its earlier 2006 SMT engine?",
    options: [
      "SMT used deep Transformers while GNMT used handwritten bilingual dictionaries",
      "SMT scored local phrase-table probabilities separately, whereas NMT trained an end-to-end continuous sequence model",
      "GNMT eliminated all training corpora and translated via rule-based syntax trees",
      "SMT could only translate speech, whereas GNMT only translated camera images",
    ],
    correctIndex: 1,
    explanation:
      "Phrase-based SMT combined separate alignment, phrase-table, and n-gram models; GNMT introduced end-to-end neural sequence modeling over continuous representations.",
  },
  {
    id: 6,
    question: "What is a major limitation of the classic BLEU metric that neural metrics like COMET aim to address?",
    options: [
      "BLEU relies on surface n-gram overlap and can penalize valid semantic paraphrases",
      "BLEU requires running a live human focus group for every single sentence",
      "BLEU only works on audio waveforms and cannot score text",
      "BLEU always produces scores greater than 100",
    ],
    correctIndex: 0,
    explanation:
      "BLEU measures exact n-gram precision against reference translations, whereas COMET uses cross-lingual pretrained neural embeddings to evaluate semantic equivalence.",
  },
  {
    id: 7,
    question: "What does 'Zero-Shot Translation' mean in a multilingual Transformer?",
    options: [
      "Translating without any GPU memory or matrix multiplication",
      "Translating directly between a language pair (e.g., Portuguese ↔ Spanish) never paired together during training",
      "Translating a sentence with zero tokens in the input",
      "Evaluating a model before any gradient descent updates occur",
    ],
    correctIndex: 1,
    explanation:
      "Demonstrated by Johnson et al. (2017), a shared multilingual model trained on EN↔PT and EN↔ES learns an interlingua-like representation enabling direct PT↔ES translation.",
  },
];

export interface AcademicReference {
  id: string;
  authors: string;
  year: string;
  title: string;
  venue: string;
  url: string;
  category: "Foundational Architecture" | "Google Translate Research" | "Tokenization & Evaluation" | "Official Documentation";
  note: string;
}

export const ACADEMIC_REFERENCES: AcademicReference[] = [
  {
    id: "vaswani2017",
    authors: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I.",
    year: "2017",
    title: "Attention Is All You Need",
    venue: "Advances in Neural Information Processing Systems (NeurIPS 30)",
    url: "https://arxiv.org/abs/1706.03762",
    category: "Foundational Architecture",
    note: "Introduced the Transformer architecture, scaled dot-product multi-head attention, and sinusoidal positional encodings.",
  },
  {
    id: "wu2016",
    authors: "Wu, Y., Schuster, M., Chen, Z., Le, Q. V., Norouzi, M., Macherey, W., ... & Dean, J.",
    year: "2016",
    title: "Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation",
    venue: "arXiv preprint arXiv:1609.08144",
    url: "https://arxiv.org/abs/1609.08144",
    category: "Google Translate Research",
    note: "Documented Google Translate's production transition from SMT to deep neural sequence-to-sequence translation with WordPiece tokenization.",
  },
  {
    id: "johnson2017",
    authors: "Johnson, M., Schuster, M., Le, Q. V., Krikun, M., Wu, Y., Chen, Z., ... & Dean, J.",
    year: "2017",
    title: "Google's Multilingual Neural Machine Translation System: Enabling Zero-Shot Translation",
    venue: "Transactions of the Association for Computational Linguistics (TACL), 5, 339–351",
    url: "https://arxiv.org/abs/1611.04558",
    category: "Google Translate Research",
    note: "Showed how a single multilingual NMT model with target-language prefix tokens enables zero-shot translation between unseen pairs.",
  },
  {
    id: "bahdanau2015",
    authors: "Bahdanau, D., Cho, K., & Bengio, Y.",
    year: "2015",
    title: "Neural Machine Translation by Jointly Learning to Align and Translate",
    venue: "International Conference on Learning Representations (ICLR 2015)",
    url: "https://arxiv.org/abs/1409.0473",
    category: "Foundational Architecture",
    note: "Introduced the neural attention mechanism to overcome the fixed-length bottleneck in early encoder–decoder networks.",
  },
  {
    id: "sennrich2016",
    authors: "Sennrich, R., Haddow, B., & Birch, A.",
    year: "2016",
    title: "Neural Machine Translation of Rare Words with Subword Units",
    venue: "Proceedings of the 54th Annual Meeting of the Association for Computational Linguistics (ACL)",
    url: "https://arxiv.org/abs/1508.07909",
    category: "Tokenization & Evaluation",
    note: "Adapted Byte-Pair Encoding (BPE) for open-vocabulary NMT, resolving rare and compound word translation.",
  },
  {
    id: "papineni2002",
    authors: "Papineni, K., Roukos, S., Ward, T., & Zhu, W.-J.",
    year: "2002",
    title: "BLEU: a Method for Automatic Evaluation of Machine Translation",
    venue: "Proceedings of the 40th Annual Meeting of the Association for Computational Linguistics (ACL)",
    url: "https://aclanthology.org/P02-1040/",
    category: "Tokenization & Evaluation",
    note: "Defined n-gram precision and brevity penalty scoring, remaining a standard historical benchmark metric.",
  },
  {
    id: "rei2020",
    authors: "Rei, R., Stewart, C., Farinha, A. C., & Lavie, A.",
    year: "2020",
    title: "COMET: A Neural Framework for MT Evaluation",
    venue: "Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP)",
    url: "https://arxiv.org/abs/2009.09025",
    category: "Tokenization & Evaluation",
    note: "Introduced learned cross-lingual evaluation correlating substantially higher with human adequacy judgments than BLEU.",
  },
  {
    id: "koehn2010",
    authors: "Koehn, P.",
    year: "2010",
    title: "Statistical Machine Translation",
    venue: "Cambridge University Press",
    url: "https://www.statmt.org/book/",
    category: "Foundational Architecture",
    note: "Comprehensive foundational textbook on word alignment, phrase-based SMT models, and beam decoding.",
  },
  {
    id: "googletranslate2024",
    authors: "Google Research & Google Cloud Translation Documentation",
    year: "2024",
    title: "Google Translate & Cloud Translation Architecture Documentation",
    venue: "Google Cloud / Google Research Publications",
    url: "https://cloud.google.com/translate/docs",
    category: "Official Documentation",
    note: "Official documentation covering supported translation modes, language expansion, and API usage.",
  },
];
