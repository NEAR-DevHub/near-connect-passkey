/**
 * Minimal, dependency-free internationalization for the executor's
 * user-facing strings.
 *
 * Languages: a broad set of the most widely spoken languages worldwide.
 * Right-to-left languages (Arabic `ar`, Persian `fa`) are marked in
 * {@link RTL_LANGS}; the dialog container in `ui.ts` sets `dir` from
 * {@link dir}.
 *
 * The active language is detected once from `navigator.languages` and can be
 * overridden with {@link setLang}. Detection uses {@link LANG_FALLBACKS} to map
 * an unsupported locale to the closest supported one (e.g. Belarusian → Russian,
 * Malay → Indonesian) before falling back to English. Missing keys fall back to
 * English, then to the key itself, so a partial translation never renders an
 * empty string.
 */

export type Lang =
  | "en"
  | "zh"
  | "hi"
  | "es"
  | "fr"
  | "ar"
  | "fa"
  | "ru"
  | "uk"
  | "pt"
  | "de"
  | "it"
  | "pl"
  | "nl"
  | "tr"
  | "id"
  | "vi"
  | "ja"
  | "ko";

export const SUPPORTED_LANGS: readonly Lang[] = [
  "en",
  "zh",
  "hi",
  "es",
  "fr",
  "ar",
  "fa",
  "ru",
  "uk",
  "pt",
  "de",
  "it",
  "pl",
  "nl",
  "tr",
  "id",
  "vi",
  "ja",
  "ko",
];

/** Right-to-left languages — the dialog container sets `dir` from these. */
const RTL_LANGS: ReadonlySet<Lang> = new Set<Lang>(["ar", "fa"]);

type Params = Record<string, string | number>;
type Catalog = Record<string, string>;

const en: Catalog = {
  appTitle: "NEAR",
  appTagline: "No password, no seed phrase — just your device.",
  signUp: "Sign up",
  signIn: "Sign in",

  addAccountTitle: "Add another account",
  addAccountSubtitle: "Enter a username or email to tell your accounts apart",
  usernameOrEmailPlaceholder: "username or email",
  continue: "Continue",

  registrationFailedTitle: "Registration failed",
  registrationNotRegisteredWarning:
    "Your passkey was created but is not registered yet. Without registration it cannot be recovered on other devices.",
  retry: "Retry",
  cancel: "Cancel",
  close: "Close",
  passkeyNotRegisteredTitle: "Passkey not registered",

  createPasskeyTitle: "Create your passkey",
  createPasskeySubtitle: "Confirm with your device when it asks",
  registeringTitle: "Registering your passkey",
  registeringSubtitle: "Publishing its public key on NEAR…",
  approveTxTitle: "Approve transaction",
  approveTxSubtitle: "Confirm with your device to approve.",
  approveBtn: "Approve",
  signMsgTitle: "Confirm signature",
  signMsgSubtitle: "Confirm with your device to sign this message.",
  signBtn: "Sign",
  confirmSignInTitle: "Confirm sign-in",
  confirmSignInSubtitle: "Confirm with your device to sign in.",
  confirmSignInBtn: "Sign in",
  confirmSignInAgainSubtitle: "Confirm once more with your device.",
  lookingUpTitle: "Looking up your account",
  lookingUpSubtitle: "Resolving your passkey on NEAR…",
  signingInTitle: "Signing you in",
  signingInFinalizeSubtitle: "Finalizing your account on NEAR…",
  signingInSetupSubtitle: "Setting up your account on NEAR…",
  usePasskeyTitle: "Use your passkey",
  usePasskeySubtitle: "Pick a passkey and confirm with your device",

  errOrphan:
    "Your device created a passkey this wallet can't use. Please open your device's password / passkey settings, delete the passkey you just created for this site, then try again on a different device.",
  errNonResident:
    "Your device created a passkey that can't be recovered later (it isn't a resident key). Please try a different device or use your phone to create the passkey.",
  errNotVerified:
    "Your device signed in without verifying it's you. Please set up Face ID, a fingerprint, a screen lock, or a security-key PIN, then try again.",
  errWrongPasskey:
    "That was a different passkey than this account. Please try again and choose this account's passkey.",
  errNotRegistered:
    "This passkey is not registered in the passkeys registry (or the registered keys do not match its signature). Create it again on the original device or register it first.",
  errRegistrationCancelled: "Passkey registration cancelled: {message}",
  errNotSignedIn: "Wallet not signed in",

  waCancelledCreate:
    "Passkey creation was cancelled or timed out. Please try again and confirm with your device when it asks.",
  waCancelledGet:
    "Sign-in was cancelled or timed out. Please try again and confirm with your device when it asks.",
  waDuplicate: "You already have an account on this device. Choose “Sign in” to use it.",
  waNotSupportedCreate:
    "This device can't create the kind of passkey this wallet needs. Try another device, or use your phone to scan the sign-in QR code.",
  waNotSupportedGet:
    "This device can't sign in with a passkey. Try the device where you first created it, or use your phone to scan the QR code.",
  waConstraintCreate:
    "Your device or security key needs a PIN, fingerprint, or face unlock set up before it can create this passkey. Add one in your device settings and try again.",
  waConstraintGet:
    "Your security key needs a PIN or your device needs a screen lock to sign in. Set one up and try again.",
  waSecurity:
    "This site isn't allowed to use passkeys right now. Make sure you're on the correct website and it's loaded over a secure (https) connection.",
  waGenericCreate:
    "Something went wrong creating your passkey. Please try again, and make sure your device's screen lock (Face ID, fingerprint, or PIN) is set up.",
  waGenericGet:
    "Something went wrong signing in with your passkey. Please try again on the device where you created it.",
};

const zh: Catalog = {
  appTitle: "NEAR",
  appTagline: "无需密码，无需助记词——只需你的设备。",
  signUp: "注册",
  signIn: "登录",

  addAccountTitle: "添加另一个账户",
  addAccountSubtitle: "输入用户名或邮箱以区分你的账户",
  usernameOrEmailPlaceholder: "用户名或邮箱",
  continue: "继续",

  registrationFailedTitle: "注册失败",
  registrationNotRegisteredWarning:
    "你的通行密钥已创建，但尚未注册。未注册将无法在其他设备上恢复。",
  retry: "重试",
  cancel: "取消",
  close: "关闭",
  passkeyNotRegisteredTitle: "通行密钥未注册",

  createPasskeyTitle: "创建你的通行密钥",
  createPasskeySubtitle: "在设备提示时进行确认",
  registeringTitle: "正在注册你的通行密钥",
  registeringSubtitle: "正在将其公钥发布到 NEAR…",
  approveTxTitle: "批准交易",
  approveTxSubtitle: "用你的设备确认以批准。",
  approveBtn: "批准",
  signMsgTitle: "确认签名",
  signMsgSubtitle: "用你的设备确认以签署此消息。",
  signBtn: "签名",
  confirmSignInTitle: "确认登录",
  confirmSignInSubtitle: "用你的设备确认以登录。",
  confirmSignInBtn: "登录",
  confirmSignInAgainSubtitle: "请再次用你的设备确认。",
  lookingUpTitle: "正在查找你的账户",
  lookingUpSubtitle: "正在 NEAR 上解析你的通行密钥…",
  signingInTitle: "正在登录",
  signingInFinalizeSubtitle: "正在 NEAR 上完成你的账户…",
  signingInSetupSubtitle: "正在 NEAR 上设置你的账户…",
  usePasskeyTitle: "使用你的通行密钥",
  usePasskeySubtitle: "选择一个通行密钥并用你的设备确认",

  errOrphan:
    "你的设备创建了一个此钱包无法使用的通行密钥。请打开设备的密码/通行密钥设置，删除你刚为本站点创建的通行密钥，然后换一台设备重试。",
  errNonResident:
    "你的设备创建了一个之后无法恢复的通行密钥（它不是常驻密钥）。请换一台设备，或用你的手机创建通行密钥。",
  errNotVerified:
    "你的设备在未验证你身份的情况下登录。请设置 Face ID、指纹、屏幕锁或安全密钥 PIN，然后重试。",
  errWrongPasskey: "所选通行密钥与此账户不符。请重试并选择此账户的通行密钥。",
  errNotRegistered:
    "此通行密钥未在通行密钥注册表中注册（或已注册的密钥与其签名不匹配）。请在原设备上重新创建，或先进行注册。",
  errRegistrationCancelled: "通行密钥注册已取消：{message}",
  errNotSignedIn: "钱包未登录",

  waCancelledCreate: "通行密钥创建已取消或超时。请重试，并在设备提示时进行确认。",
  waCancelledGet: "登录已取消或超时。请重试，并在设备提示时进行确认。",
  waDuplicate: "你在此设备上已有一个账户。请选择“登录”以使用它。",
  waNotSupportedCreate:
    "此设备无法创建此钱包所需类型的通行密钥。请换一台设备，或用你的手机扫描登录二维码。",
  waNotSupportedGet:
    "此设备无法使用通行密钥登录。请使用你最初创建它的设备，或用你的手机扫描二维码。",
  waConstraintCreate:
    "你的设备或安全密钥需要先设置 PIN、指纹或面部解锁，才能创建此通行密钥。请在设备设置中添加后重试。",
  waConstraintGet: "你的安全密钥需要 PIN，或你的设备需要屏幕锁才能登录。设置后请重试。",
  waSecurity:
    "此站点当前不被允许使用通行密钥。请确认你在正确的网站上，并且通过安全（https）连接加载。",
  waGenericCreate: "创建通行密钥时出错。请重试，并确保已设置设备的屏幕锁（Face ID、指纹或 PIN）。",
  waGenericGet: "使用通行密钥登录时出错。请在你创建它的设备上重试。",
};

const hi: Catalog = {
  appTitle: "NEAR",
  appTagline: "कोई पासवर्ड नहीं, कोई सीड फ़्रेज़ नहीं — बस आपका डिवाइस।",
  signUp: "साइन अप करें",
  signIn: "साइन इन करें",

  addAccountTitle: "एक और खाता जोड़ें",
  addAccountSubtitle: "अपने खातों को अलग पहचानने के लिए यूज़रनेम या ईमेल दर्ज करें",
  usernameOrEmailPlaceholder: "यूज़रनेम या ईमेल",
  continue: "जारी रखें",

  registrationFailedTitle: "पंजीकरण विफल",
  registrationNotRegisteredWarning:
    "आपकी पासकी बन गई है लेकिन अभी पंजीकृत नहीं है। पंजीकरण के बिना इसे अन्य डिवाइस पर पुनर्प्राप्त नहीं किया जा सकता।",
  retry: "पुनः प्रयास करें",
  cancel: "रद्द करें",
  close: "बंद करें",
  passkeyNotRegisteredTitle: "पासकी पंजीकृत नहीं है",

  createPasskeyTitle: "अपनी पासकी बनाएँ",
  createPasskeySubtitle: "जब आपका डिवाइस पूछे तो पुष्टि करें",
  registeringTitle: "आपकी पासकी पंजीकृत हो रही है",
  registeringSubtitle: "इसकी सार्वजनिक कुंजी NEAR पर प्रकाशित हो रही है…",
  approveTxTitle: "लेन-देन स्वीकृत करें",
  approveTxSubtitle: "स्वीकृत करने के लिए अपने डिवाइस से पुष्टि करें।",
  approveBtn: "स्वीकृत करें",
  signMsgTitle: "हस्ताक्षर की पुष्टि करें",
  signMsgSubtitle: "इस संदेश पर हस्ताक्षर करने के लिए अपने डिवाइस से पुष्टि करें।",
  signBtn: "हस्ताक्षर करें",
  confirmSignInTitle: "साइन इन की पुष्टि करें",
  confirmSignInSubtitle: "साइन इन करने के लिए अपने डिवाइस से पुष्टि करें।",
  confirmSignInBtn: "साइन इन करें",
  confirmSignInAgainSubtitle: "अपने डिवाइस से एक बार फिर पुष्टि करें।",
  lookingUpTitle: "आपका खाता खोजा जा रहा है",
  lookingUpSubtitle: "NEAR पर आपकी पासकी हल की जा रही है…",
  signingInTitle: "आपको साइन इन किया जा रहा है",
  signingInFinalizeSubtitle: "NEAR पर आपका खाता अंतिम रूप दिया जा रहा है…",
  signingInSetupSubtitle: "NEAR पर आपका खाता सेट किया जा रहा है…",
  usePasskeyTitle: "अपनी पासकी का उपयोग करें",
  usePasskeySubtitle: "एक पासकी चुनें और अपने डिवाइस से पुष्टि करें",

  errOrphan:
    "आपके डिवाइस ने एक ऐसी पासकी बनाई जिसे यह वॉलेट उपयोग नहीं कर सकता। कृपया अपने डिवाइस की पासवर्ड / पासकी सेटिंग्स खोलें, इस साइट के लिए अभी बनाई गई पासकी हटाएँ, फिर किसी दूसरे डिवाइस पर पुनः प्रयास करें।",
  errNonResident:
    "आपके डिवाइस ने एक ऐसी पासकी बनाई जिसे बाद में पुनर्प्राप्त नहीं किया जा सकता (यह रेज़िडेंट कुंजी नहीं है)। कृपया कोई दूसरा डिवाइस आज़माएँ या पासकी बनाने के लिए अपने फ़ोन का उपयोग करें।",
  errNotVerified:
    "आपके डिवाइस ने आपकी पहचान सत्यापित किए बिना साइन इन किया। कृपया Face ID, फ़िंगरप्रिंट, स्क्रीन लॉक, या सुरक्षा-कुंजी PIN सेट करें, फिर पुनः प्रयास करें।",
  errWrongPasskey:
    "यह इस खाते से अलग पासकी थी। कृपया पुनः प्रयास करें और इस खाते की पासकी चुनें।",
  errNotRegistered:
    "यह पासकी पासकी रजिस्ट्री में पंजीकृत नहीं है (या पंजीकृत कुंजियाँ इसके हस्ताक्षर से मेल नहीं खातीं)। इसे मूल डिवाइस पर फिर से बनाएँ या पहले पंजीकृत करें।",
  errRegistrationCancelled: "पासकी पंजीकरण रद्द किया गया: {message}",
  errNotSignedIn: "वॉलेट साइन इन नहीं है",

  waCancelledCreate:
    "पासकी निर्माण रद्द हुआ या समय समाप्त हो गया। कृपया पुनः प्रयास करें और जब आपका डिवाइस पूछे तो पुष्टि करें।",
  waCancelledGet:
    "साइन इन रद्द हुआ या समय समाप्त हो गया। कृपया पुनः प्रयास करें और जब आपका डिवाइस पूछे तो पुष्टि करें।",
  waDuplicate: "इस डिवाइस पर आपके पास पहले से एक खाता है। इसे उपयोग करने के लिए “साइन इन करें” चुनें।",
  waNotSupportedCreate:
    "यह डिवाइस इस वॉलेट के लिए आवश्यक प्रकार की पासकी नहीं बना सकता। कोई दूसरा डिवाइस आज़माएँ, या साइन-इन QR कोड स्कैन करने के लिए अपने फ़ोन का उपयोग करें।",
  waNotSupportedGet:
    "यह डिवाइस पासकी से साइन इन नहीं कर सकता। जिस डिवाइस पर आपने इसे बनाया था उसे आज़माएँ, या QR कोड स्कैन करने के लिए अपने फ़ोन का उपयोग करें।",
  waConstraintCreate:
    "इस पासकी को बनाने से पहले आपके डिवाइस या सुरक्षा कुंजी में PIN, फ़िंगरप्रिंट, या फ़ेस अनलॉक सेट होना चाहिए। इसे अपने डिवाइस सेटिंग्स में जोड़ें और पुनः प्रयास करें।",
  waConstraintGet:
    "साइन इन करने के लिए आपकी सुरक्षा कुंजी को PIN या आपके डिवाइस को स्क्रीन लॉक चाहिए। इसे सेट करें और पुनः प्रयास करें।",
  waSecurity:
    "यह साइट अभी पासकी का उपयोग करने की अनुमति नहीं है। सुनिश्चित करें कि आप सही वेबसाइट पर हैं और यह सुरक्षित (https) कनेक्शन पर लोड है।",
  waGenericCreate:
    "आपकी पासकी बनाते समय कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें और सुनिश्चित करें कि आपके डिवाइस का स्क्रीन लॉक (Face ID, फ़िंगरप्रिंट, या PIN) सेट है।",
  waGenericGet:
    "आपकी पासकी से साइन इन करते समय कुछ गड़बड़ हुई। जिस डिवाइस पर आपने इसे बनाया था उस पर पुनः प्रयास करें।",
};

const es: Catalog = {
  appTitle: "NEAR",
  appTagline: "Sin contraseña, sin frase semilla — solo tu dispositivo.",
  signUp: "Registrarse",
  signIn: "Iniciar sesión",

  addAccountTitle: "Añadir otra cuenta",
  addAccountSubtitle: "Introduce un usuario o correo para diferenciar tus cuentas",
  usernameOrEmailPlaceholder: "usuario o correo",
  continue: "Continuar",

  registrationFailedTitle: "Error de registro",
  registrationNotRegisteredWarning:
    "Tu passkey se creó pero aún no está registrada. Sin registro no se puede recuperar en otros dispositivos.",
  retry: "Reintentar",
  cancel: "Cancelar",
  close: "Cerrar",
  passkeyNotRegisteredTitle: "Passkey no registrada",

  createPasskeyTitle: "Crea tu passkey",
  createPasskeySubtitle: "Confirma con tu dispositivo cuando te lo pida",
  registeringTitle: "Registrando tu passkey",
  registeringSubtitle: "Publicando su clave pública en NEAR…",
  approveTxTitle: "Aprobar transacción",
  approveTxSubtitle: "Confirma con tu dispositivo para aprobar.",
  approveBtn: "Aprobar",
  signMsgTitle: "Confirmar firma",
  signMsgSubtitle: "Confirma con tu dispositivo para firmar este mensaje.",
  signBtn: "Firmar",
  confirmSignInTitle: "Confirmar inicio de sesión",
  confirmSignInSubtitle: "Confirma con tu dispositivo para iniciar sesión.",
  confirmSignInBtn: "Iniciar sesión",
  confirmSignInAgainSubtitle: "Confirma una vez más con tu dispositivo.",
  lookingUpTitle: "Buscando tu cuenta",
  lookingUpSubtitle: "Resolviendo tu passkey en NEAR…",
  signingInTitle: "Iniciando sesión",
  signingInFinalizeSubtitle: "Finalizando tu cuenta en NEAR…",
  signingInSetupSubtitle: "Configurando tu cuenta en NEAR…",
  usePasskeyTitle: "Usa tu passkey",
  usePasskeySubtitle: "Elige una passkey y confirma con tu dispositivo",

  errOrphan:
    "Tu dispositivo creó una passkey que esta wallet no puede usar. Abre los ajustes de contraseñas / passkeys de tu dispositivo, elimina la passkey que acabas de crear para este sitio e inténtalo de nuevo en otro dispositivo.",
  errNonResident:
    "Tu dispositivo creó una passkey que no se podrá recuperar más adelante (no es una clave residente). Prueba con otro dispositivo o usa tu teléfono para crear la passkey.",
  errNotVerified:
    "Tu dispositivo inició sesión sin verificar tu identidad. Configura Face ID, una huella, un bloqueo de pantalla o un PIN de llave de seguridad e inténtalo de nuevo.",
  errWrongPasskey:
    "Esa era una passkey distinta a la de esta cuenta. Inténtalo de nuevo y elige la passkey de esta cuenta.",
  errNotRegistered:
    "Esta passkey no está registrada en el registro de passkeys (o las claves registradas no coinciden con su firma). Vuelve a crearla en el dispositivo original o regístrala primero.",
  errRegistrationCancelled: "Registro de passkey cancelado: {message}",
  errNotSignedIn: "Sesión no iniciada en la wallet",

  waCancelledCreate:
    "La creación de la passkey se canceló o expiró. Inténtalo de nuevo y confirma con tu dispositivo cuando te lo pida.",
  waCancelledGet:
    "El inicio de sesión se canceló o expiró. Inténtalo de nuevo y confirma con tu dispositivo cuando te lo pida.",
  waDuplicate: "Ya tienes una cuenta en este dispositivo. Elige «Iniciar sesión» para usarla.",
  waNotSupportedCreate:
    "Este dispositivo no puede crear el tipo de passkey que necesita esta wallet. Prueba con otro dispositivo o usa tu teléfono para escanear el código QR de inicio de sesión.",
  waNotSupportedGet:
    "Este dispositivo no puede iniciar sesión con una passkey. Prueba con el dispositivo donde la creaste o usa tu teléfono para escanear el código QR.",
  waConstraintCreate:
    "Tu dispositivo o llave de seguridad necesita un PIN, huella o desbloqueo facial configurado antes de crear esta passkey. Configúralo en los ajustes de tu dispositivo e inténtalo de nuevo.",
  waConstraintGet:
    "Tu llave de seguridad necesita un PIN o tu dispositivo un bloqueo de pantalla para iniciar sesión. Configúralo e inténtalo de nuevo.",
  waSecurity:
    "Este sitio no puede usar passkeys ahora mismo. Asegúrate de estar en el sitio web correcto y de que se cargue mediante una conexión segura (https).",
  waGenericCreate:
    "Algo salió mal al crear tu passkey. Inténtalo de nuevo y asegúrate de tener configurado el bloqueo de pantalla de tu dispositivo (Face ID, huella o PIN).",
  waGenericGet:
    "Algo salió mal al iniciar sesión con tu passkey. Inténtalo de nuevo en el dispositivo donde la creaste.",
};

const fr: Catalog = {
  appTitle: "NEAR",
  appTagline: "Pas de mot de passe, pas de phrase secrète — juste votre appareil.",
  signUp: "S'inscrire",
  signIn: "Se connecter",

  addAccountTitle: "Ajouter un autre compte",
  addAccountSubtitle: "Saisissez un nom d'utilisateur ou un e-mail pour distinguer vos comptes",
  usernameOrEmailPlaceholder: "nom d'utilisateur ou e-mail",
  continue: "Continuer",

  registrationFailedTitle: "Échec de l'enregistrement",
  registrationNotRegisteredWarning:
    "Votre passkey a été créée mais n'est pas encore enregistrée. Sans enregistrement, elle ne peut pas être récupérée sur d'autres appareils.",
  retry: "Réessayer",
  cancel: "Annuler",
  close: "Fermer",
  passkeyNotRegisteredTitle: "Passkey non enregistrée",

  createPasskeyTitle: "Créez votre passkey",
  createPasskeySubtitle: "Confirmez avec votre appareil lorsqu'il le demande",
  registeringTitle: "Enregistrement de votre passkey",
  registeringSubtitle: "Publication de sa clé publique sur NEAR…",
  approveTxTitle: "Approuver la transaction",
  approveTxSubtitle: "Confirmez avec votre appareil pour approuver.",
  approveBtn: "Approuver",
  signMsgTitle: "Confirmer la signature",
  signMsgSubtitle: "Confirmez avec votre appareil pour signer ce message.",
  signBtn: "Signer",
  confirmSignInTitle: "Confirmer la connexion",
  confirmSignInSubtitle: "Confirmez avec votre appareil pour vous connecter.",
  confirmSignInBtn: "Se connecter",
  confirmSignInAgainSubtitle: "Confirmez encore une fois avec votre appareil.",
  lookingUpTitle: "Recherche de votre compte",
  lookingUpSubtitle: "Résolution de votre passkey sur NEAR…",
  signingInTitle: "Connexion en cours",
  signingInFinalizeSubtitle: "Finalisation de votre compte sur NEAR…",
  signingInSetupSubtitle: "Configuration de votre compte sur NEAR…",
  usePasskeyTitle: "Utilisez votre passkey",
  usePasskeySubtitle: "Choisissez une passkey et confirmez avec votre appareil",

  errOrphan:
    "Votre appareil a créé une passkey que ce portefeuille ne peut pas utiliser. Ouvrez les réglages mots de passe / passkeys de votre appareil, supprimez la passkey que vous venez de créer pour ce site, puis réessayez sur un autre appareil.",
  errNonResident:
    "Votre appareil a créé une passkey qui ne pourra pas être récupérée plus tard (ce n'est pas une clé résidente). Essayez un autre appareil ou utilisez votre téléphone pour créer la passkey.",
  errNotVerified:
    "Votre appareil s'est connecté sans vérifier votre identité. Configurez Face ID, une empreinte, un verrouillage d'écran ou un code PIN de clé de sécurité, puis réessayez.",
  errWrongPasskey:
    "Ce n'était pas la passkey de ce compte. Réessayez et choisissez la passkey de ce compte.",
  errNotRegistered:
    "Cette passkey n'est pas enregistrée dans le registre des passkeys (ou les clés enregistrées ne correspondent pas à sa signature). Recréez-la sur l'appareil d'origine ou enregistrez-la d'abord.",
  errRegistrationCancelled: "Enregistrement de la passkey annulé : {message}",
  errNotSignedIn: "Portefeuille non connecté",

  waCancelledCreate:
    "La création de la passkey a été annulée ou a expiré. Réessayez et confirmez avec votre appareil lorsqu'il le demande.",
  waCancelledGet:
    "La connexion a été annulée ou a expiré. Réessayez et confirmez avec votre appareil lorsqu'il le demande.",
  waDuplicate: "Vous avez déjà un compte sur cet appareil. Choisissez « Se connecter » pour l'utiliser.",
  waNotSupportedCreate:
    "Cet appareil ne peut pas créer le type de passkey requis par ce portefeuille. Essayez un autre appareil ou utilisez votre téléphone pour scanner le QR code de connexion.",
  waNotSupportedGet:
    "Cet appareil ne peut pas se connecter avec une passkey. Essayez l'appareil où vous l'avez créée ou utilisez votre téléphone pour scanner le QR code.",
  waConstraintCreate:
    "Votre appareil ou votre clé de sécurité doit avoir un code PIN, une empreinte ou un déverrouillage facial configuré avant de créer cette passkey. Configurez-le dans les réglages de votre appareil et réessayez.",
  waConstraintGet:
    "Votre clé de sécurité a besoin d'un code PIN ou votre appareil d'un verrouillage d'écran pour se connecter. Configurez-le et réessayez.",
  waSecurity:
    "Ce site n'est pas autorisé à utiliser les passkeys pour le moment. Vérifiez que vous êtes sur le bon site et qu'il est chargé via une connexion sécurisée (https).",
  waGenericCreate:
    "Une erreur s'est produite lors de la création de votre passkey. Réessayez et assurez-vous que le verrouillage d'écran de votre appareil (Face ID, empreinte ou PIN) est configuré.",
  waGenericGet:
    "Une erreur s'est produite lors de la connexion avec votre passkey. Réessayez sur l'appareil où vous l'avez créée.",
};

const ar: Catalog = {
  appTitle: "NEAR",
  appTagline: "لا كلمة مرور، ولا عبارة استرداد — جهازك فقط.",
  signUp: "إنشاء حساب",
  signIn: "تسجيل الدخول",

  addAccountTitle: "إضافة حساب آخر",
  addAccountSubtitle: "أدخل اسم مستخدم أو بريدًا إلكترونيًا للتمييز بين حساباتك",
  usernameOrEmailPlaceholder: "اسم المستخدم أو البريد الإلكتروني",
  continue: "متابعة",

  registrationFailedTitle: "فشل التسجيل",
  registrationNotRegisteredWarning:
    "تم إنشاء مفتاح المرور الخاص بك لكنه غير مُسجّل بعد. بدون التسجيل لا يمكن استرداده على أجهزة أخرى.",
  retry: "إعادة المحاولة",
  cancel: "إلغاء",
  close: "إغلاق",
  passkeyNotRegisteredTitle: "مفتاح المرور غير مُسجّل",

  createPasskeyTitle: "أنشئ مفتاح المرور الخاص بك",
  createPasskeySubtitle: "أكِّد على جهازك عند الطلب",
  registeringTitle: "جارٍ تسجيل مفتاح المرور",
  registeringSubtitle: "جارٍ نشر مفتاحه العام على NEAR…",
  approveTxTitle: "الموافقة على المعاملة",
  approveTxSubtitle: "أكِّد على جهازك للموافقة.",
  approveBtn: "موافقة",
  signMsgTitle: "تأكيد التوقيع",
  signMsgSubtitle: "أكِّد على جهازك لتوقيع هذه الرسالة.",
  signBtn: "توقيع",
  confirmSignInTitle: "تأكيد تسجيل الدخول",
  confirmSignInSubtitle: "أكِّد على جهازك لتسجيل الدخول.",
  confirmSignInBtn: "تسجيل الدخول",
  confirmSignInAgainSubtitle: "أكِّد مرة أخرى على جهازك.",
  lookingUpTitle: "جارٍ البحث عن حسابك",
  lookingUpSubtitle: "جارٍ التعرّف على مفتاح المرور على NEAR…",
  signingInTitle: "جارٍ تسجيل دخولك",
  signingInFinalizeSubtitle: "جارٍ إتمام حسابك على NEAR…",
  signingInSetupSubtitle: "جارٍ إعداد حسابك على NEAR…",
  usePasskeyTitle: "استخدم مفتاح المرور الخاص بك",
  usePasskeySubtitle: "اختر مفتاح مرور وأكِّد على جهازك",

  errOrphan:
    "أنشأ جهازك مفتاح مرور لا يمكن لهذه المحفظة استخدامه. افتح إعدادات كلمات المرور / مفاتيح المرور على جهازك، واحذف مفتاح المرور الذي أنشأته للتو لهذا الموقع، ثم أعد المحاولة على جهاز آخر.",
  errNonResident:
    "أنشأ جهازك مفتاح مرور لا يمكن استرداده لاحقًا (ليس مفتاحًا مقيمًا). جرّب جهازًا آخر أو استخدم هاتفك لإنشاء مفتاح المرور.",
  errNotVerified:
    "سجّل جهازك الدخول دون التحقق من هويتك. يُرجى إعداد Face ID أو بصمة إصبع أو قفل شاشة أو رمز PIN لمفتاح أمان، ثم أعد المحاولة.",
  errWrongPasskey:
    "كان هذا مفتاح مرور مختلفًا عن هذا الحساب. أعد المحاولة واختر مفتاح مرور هذا الحساب.",
  errNotRegistered:
    "مفتاح المرور هذا غير مُسجّل في سجل مفاتيح المرور (أو المفاتيح المُسجّلة لا تطابق توقيعه). أنشئه من جديد على الجهاز الأصلي أو سجّله أولًا.",
  errRegistrationCancelled: "تم إلغاء تسجيل مفتاح المرور: {message}",
  errNotSignedIn: "لم يتم تسجيل الدخول إلى المحفظة",

  waCancelledCreate:
    "تم إلغاء إنشاء مفتاح المرور أو انتهت المهلة. أعد المحاولة وأكِّد على جهازك عند الطلب.",
  waCancelledGet:
    "تم إلغاء تسجيل الدخول أو انتهت المهلة. أعد المحاولة وأكِّد على جهازك عند الطلب.",
  waDuplicate: "لديك حساب بالفعل على هذا الجهاز. اختر «تسجيل الدخول» لاستخدامه.",
  waNotSupportedCreate:
    "لا يستطيع هذا الجهاز إنشاء نوع مفتاح المرور الذي تحتاجه هذه المحفظة. جرّب جهازًا آخر، أو استخدم هاتفك لمسح رمز QR لتسجيل الدخول.",
  waNotSupportedGet:
    "لا يستطيع هذا الجهاز تسجيل الدخول بمفتاح مرور. جرّب الجهاز الذي أنشأته عليه أولًا، أو استخدم هاتفك لمسح رمز QR.",
  waConstraintCreate:
    "يحتاج جهازك أو مفتاح الأمان إلى إعداد رمز PIN أو بصمة إصبع أو فتح بالوجه قبل أن يتمكن من إنشاء مفتاح المرور هذا. أضِف واحدًا في إعدادات جهازك وأعد المحاولة.",
  waConstraintGet:
    "يحتاج مفتاح الأمان إلى رمز PIN أو يحتاج جهازك إلى قفل شاشة لتسجيل الدخول. أعدّه ثم أعد المحاولة.",
  waSecurity:
    "غير مسموح لهذا الموقع باستخدام مفاتيح المرور حاليًا. تأكّد من أنك على الموقع الصحيح وأنه مُحمّل عبر اتصال آمن (https).",
  waGenericCreate:
    "حدث خطأ أثناء إنشاء مفتاح المرور. أعد المحاولة، وتأكّد من إعداد قفل شاشة جهازك (Face ID أو بصمة إصبع أو رمز PIN).",
  waGenericGet:
    "حدث خطأ أثناء تسجيل الدخول بمفتاح المرور. أعد المحاولة على الجهاز الذي أنشأته عليه.",
};

const fa: Catalog = {
  appTitle: "NEAR",
  appTagline: "بدون رمز عبور، بدون عبارت بازیابی — فقط دستگاه شما.",
  signUp: "ثبت‌نام",
  signIn: "ورود",

  addAccountTitle: "افزودن حساب دیگر",
  addAccountSubtitle: "برای تمایز حساب‌هایتان یک نام کاربری یا ایمیل وارد کنید",
  usernameOrEmailPlaceholder: "نام کاربری یا ایمیل",
  continue: "ادامه",

  registrationFailedTitle: "ثبت‌نام ناموفق بود",
  registrationNotRegisteredWarning:
    "پس‌کلید شما ساخته شد اما هنوز ثبت نشده است. بدون ثبت، روی دستگاه‌های دیگر قابل بازیابی نیست.",
  retry: "تلاش دوباره",
  cancel: "لغو",
  close: "بستن",
  passkeyNotRegisteredTitle: "پس‌کلید ثبت نشده است",

  createPasskeyTitle: "پس‌کلید خود را بسازید",
  createPasskeySubtitle: "هنگام درخواست، با دستگاه خود تأیید کنید",
  registeringTitle: "در حال ثبت پس‌کلید شما",
  registeringSubtitle: "در حال انتشار کلید عمومی آن روی NEAR…",
  approveTxTitle: "تأیید تراکنش",
  approveTxSubtitle: "برای تأیید، با دستگاه خود تأیید کنید.",
  approveBtn: "تأیید",
  signMsgTitle: "تأیید امضا",
  signMsgSubtitle: "برای امضای این پیام، با دستگاه خود تأیید کنید.",
  signBtn: "امضا",
  confirmSignInTitle: "تأیید ورود",
  confirmSignInSubtitle: "برای ورود، با دستگاه خود تأیید کنید.",
  confirmSignInBtn: "ورود",
  confirmSignInAgainSubtitle: "یک بار دیگر با دستگاه خود تأیید کنید.",
  lookingUpTitle: "در حال یافتن حساب شما",
  lookingUpSubtitle: "در حال یافتن پس‌کلید شما روی NEAR…",
  signingInTitle: "در حال ورود شما",
  signingInFinalizeSubtitle: "در حال نهایی‌سازی حساب شما روی NEAR…",
  signingInSetupSubtitle: "در حال راه‌اندازی حساب شما روی NEAR…",
  usePasskeyTitle: "از پس‌کلید خود استفاده کنید",
  usePasskeySubtitle: "یک پس‌کلید انتخاب کنید و با دستگاه خود تأیید کنید",

  errOrphan:
    "دستگاه شما پس‌کلیدی ساخت که این کیف پول نمی‌تواند از آن استفاده کند. تنظیمات رمزها / پس‌کلیدهای دستگاه خود را باز کنید، پس‌کلیدی که همین حالا برای این سایت ساختید حذف کنید، سپس روی دستگاه دیگری دوباره تلاش کنید.",
  errNonResident:
    "دستگاه شما پس‌کلیدی ساخت که بعداً قابل بازیابی نیست (کلید مقیم نیست). دستگاه دیگری را امتحان کنید یا از تلفن خود برای ساخت پس‌کلید استفاده کنید.",
  errNotVerified:
    "دستگاه شما بدون تأیید هویت شما وارد شد. لطفاً Face ID، اثر انگشت، قفل صفحه یا پین کلید امنیتی را تنظیم کنید، سپس دوباره تلاش کنید.",
  errWrongPasskey:
    "این پس‌کلیدی متفاوت از این حساب بود. دوباره تلاش کنید و پس‌کلید این حساب را انتخاب کنید.",
  errNotRegistered:
    "این پس‌کلید در دفترچه پس‌کلیدها ثبت نشده است (یا کلیدهای ثبت‌شده با امضای آن مطابقت ندارند). آن را روی دستگاه اصلی دوباره بسازید یا ابتدا ثبت کنید.",
  errRegistrationCancelled: "ثبت پس‌کلید لغو شد: {message}",
  errNotSignedIn: "به کیف پول وارد نشده‌اید",

  waCancelledCreate:
    "ساخت پس‌کلید لغو شد یا زمان آن به پایان رسید. دوباره تلاش کنید و هنگام درخواست با دستگاه خود تأیید کنید.",
  waCancelledGet:
    "ورود لغو شد یا زمان آن به پایان رسید. دوباره تلاش کنید و هنگام درخواست با دستگاه خود تأیید کنید.",
  waDuplicate: "شما از قبل روی این دستگاه یک حساب دارید. برای استفاده «ورود» را انتخاب کنید.",
  waNotSupportedCreate:
    "این دستگاه نمی‌تواند نوع پس‌کلید مورد نیاز این کیف پول را بسازد. دستگاه دیگری را امتحان کنید یا از تلفن خود برای اسکن کد QR ورود استفاده کنید.",
  waNotSupportedGet:
    "این دستگاه نمی‌تواند با پس‌کلید وارد شود. دستگاهی که ابتدا آن را ساختید امتحان کنید یا از تلفن خود برای اسکن کد QR استفاده کنید.",
  waConstraintCreate:
    "دستگاه یا کلید امنیتی شما پیش از ساخت این پس‌کلید به یک پین، اثر انگشت یا بازکردن با چهره نیاز دارد. آن را در تنظیمات دستگاه خود اضافه کنید و دوباره تلاش کنید.",
  waConstraintGet:
    "کلید امنیتی شما به پین یا دستگاه شما به قفل صفحه برای ورود نیاز دارد. آن را تنظیم کنید و دوباره تلاش کنید.",
  waSecurity:
    "این سایت اکنون مجاز به استفاده از پس‌کلید نیست. مطمئن شوید در وب‌سایت درست هستید و از طریق اتصال امن (https) بارگذاری شده است.",
  waGenericCreate:
    "هنگام ساخت پس‌کلید خطایی رخ داد. دوباره تلاش کنید و مطمئن شوید قفل صفحه دستگاه شما (Face ID، اثر انگشت یا پین) تنظیم شده است.",
  waGenericGet:
    "هنگام ورود با پس‌کلید خطایی رخ داد. روی دستگاهی که آن را ساختید دوباره تلاش کنید.",
};

const ru: Catalog = {
  appTitle: "NEAR",
  appTagline: "Без пароля, без seed-фразы — только ваше устройство.",
  signUp: "Зарегистрироваться",
  signIn: "Войти",

  addAccountTitle: "Добавить ещё один аккаунт",
  addAccountSubtitle: "Введите имя пользователя или email, чтобы различать аккаунты",
  usernameOrEmailPlaceholder: "имя пользователя или email",
  continue: "Продолжить",

  registrationFailedTitle: "Не удалось зарегистрировать",
  registrationNotRegisteredWarning:
    "Ваш passkey создан, но ещё не зарегистрирован. Без регистрации его нельзя восстановить на других устройствах.",
  retry: "Повторить",
  cancel: "Отмена",
  close: "Закрыть",
  passkeyNotRegisteredTitle: "Passkey не зарегистрирован",

  createPasskeyTitle: "Создайте passkey",
  createPasskeySubtitle: "Подтвердите на устройстве по запросу",
  registeringTitle: "Регистрируем ваш passkey",
  registeringSubtitle: "Публикуем его открытый ключ в NEAR…",
  approveTxTitle: "Подтвердить транзакцию",
  approveTxSubtitle: "Подтвердите на устройстве, чтобы одобрить.",
  approveBtn: "Одобрить",
  signMsgTitle: "Подтвердить подпись",
  signMsgSubtitle: "Подтвердите на устройстве, чтобы подписать это сообщение.",
  signBtn: "Подписать",
  confirmSignInTitle: "Подтвердить вход",
  confirmSignInSubtitle: "Подтвердите на устройстве, чтобы войти.",
  confirmSignInBtn: "Войти",
  confirmSignInAgainSubtitle: "Подтвердите ещё раз на устройстве.",
  lookingUpTitle: "Ищем ваш аккаунт",
  lookingUpSubtitle: "Определяем ваш passkey в NEAR…",
  signingInTitle: "Выполняем вход",
  signingInFinalizeSubtitle: "Завершаем настройку аккаунта в NEAR…",
  signingInSetupSubtitle: "Настраиваем ваш аккаунт в NEAR…",
  usePasskeyTitle: "Используйте ваш passkey",
  usePasskeySubtitle: "Выберите passkey и подтвердите на устройстве",

  errOrphan:
    "Ваше устройство создало passkey, который этот кошелёк не может использовать. Откройте настройки паролей / passkey на устройстве, удалите passkey, только что созданный для этого сайта, затем повторите на другом устройстве.",
  errNonResident:
    "Ваше устройство создало passkey, который нельзя будет восстановить (это не резидентный ключ). Попробуйте другое устройство или создайте passkey с телефона.",
  errNotVerified:
    "Ваше устройство выполнило вход без подтверждения вашей личности. Настройте Face ID, отпечаток пальца, блокировку экрана или PIN ключа безопасности и повторите попытку.",
  errWrongPasskey:
    "Это был другой passkey, не от этого аккаунта. Повторите попытку и выберите passkey этого аккаунта.",
  errNotRegistered:
    "Этот passkey не зарегистрирован в реестре passkey (или зарегистрированные ключи не соответствуют его подписи). Создайте его заново на исходном устройстве или сначала зарегистрируйте.",
  errRegistrationCancelled: "Регистрация passkey отменена: {message}",
  errNotSignedIn: "Вход в кошелёк не выполнен",

  waCancelledCreate:
    "Создание passkey отменено или истекло время ожидания. Повторите попытку и подтвердите на устройстве по запросу.",
  waCancelledGet:
    "Вход отменён или истекло время ожидания. Повторите попытку и подтвердите на устройстве по запросу.",
  waDuplicate: "На этом устройстве у вас уже есть аккаунт. Выберите «Войти», чтобы использовать его.",
  waNotSupportedCreate:
    "Это устройство не может создать passkey нужного этому кошельку типа. Попробуйте другое устройство или отсканируйте телефоном QR-код для входа.",
  waNotSupportedGet:
    "Это устройство не может войти с passkey. Попробуйте устройство, на котором вы его создали, или отсканируйте телефоном QR-код.",
  waConstraintCreate:
    "Прежде чем создать этот passkey, на устройстве или ключе безопасности нужно настроить PIN, отпечаток пальца или разблокировку по лицу. Добавьте их в настройках устройства и повторите.",
  waConstraintGet:
    "Для входа ключу безопасности нужен PIN, а устройству — блокировка экрана. Настройте и повторите попытку.",
  waSecurity:
    "Этому сайту сейчас нельзя использовать passkey. Убедитесь, что вы на правильном сайте и он загружен по защищённому соединению (https).",
  waGenericCreate:
    "Не удалось создать passkey. Повторите попытку и убедитесь, что на устройстве настроена блокировка экрана (Face ID, отпечаток пальца или PIN).",
  waGenericGet:
    "Не удалось войти с passkey. Повторите попытку на устройстве, где вы его создали.",
};

const uk: Catalog = {
  appTitle: "NEAR",
  appTagline: "Без пароля, без seed-фрази — лише ваш пристрій.",
  signUp: "Зареєструватися",
  signIn: "Увійти",

  addAccountTitle: "Додати інший обліковий запис",
  addAccountSubtitle: "Введіть ім'я користувача або email, щоб розрізняти облікові записи",
  usernameOrEmailPlaceholder: "ім'я користувача або email",
  continue: "Продовжити",

  registrationFailedTitle: "Не вдалося зареєструвати",
  registrationNotRegisteredWarning:
    "Ваш passkey створено, але ще не зареєстровано. Без реєстрації його неможливо відновити на інших пристроях.",
  retry: "Повторити",
  cancel: "Скасувати",
  close: "Закрити",
  passkeyNotRegisteredTitle: "Passkey не зареєстровано",

  createPasskeyTitle: "Створіть passkey",
  createPasskeySubtitle: "Підтвердьте на пристрої за запитом",
  registeringTitle: "Реєструємо ваш passkey",
  registeringSubtitle: "Публікуємо його відкритий ключ у NEAR…",
  approveTxTitle: "Підтвердити транзакцію",
  approveTxSubtitle: "Підтвердьте на пристрої, щоб схвалити.",
  approveBtn: "Схвалити",
  signMsgTitle: "Підтвердити підпис",
  signMsgSubtitle: "Підтвердьте на пристрої, щоб підписати це повідомлення.",
  signBtn: "Підписати",
  confirmSignInTitle: "Підтвердити вхід",
  confirmSignInSubtitle: "Підтвердьте на пристрої, щоб увійти.",
  confirmSignInBtn: "Увійти",
  confirmSignInAgainSubtitle: "Підтвердьте ще раз на пристрої.",
  lookingUpTitle: "Шукаємо ваш обліковий запис",
  lookingUpSubtitle: "Визначаємо ваш passkey у NEAR…",
  signingInTitle: "Виконуємо вхід",
  signingInFinalizeSubtitle: "Завершуємо налаштування облікового запису в NEAR…",
  signingInSetupSubtitle: "Налаштовуємо ваш обліковий запис у NEAR…",
  usePasskeyTitle: "Скористайтеся вашим passkey",
  usePasskeySubtitle: "Виберіть passkey і підтвердьте на пристрої",

  errOrphan:
    "Ваш пристрій створив passkey, який цей гаманець не може використати. Відкрийте налаштування паролів / passkey на пристрої, видаліть passkey, щойно створений для цього сайту, потім повторіть на іншому пристрої.",
  errNonResident:
    "Ваш пристрій створив passkey, який не можна буде відновити (це не резидентний ключ). Спробуйте інший пристрій або створіть passkey з телефона.",
  errNotVerified:
    "Ваш пристрій виконав вхід без підтвердження вашої особи. Налаштуйте Face ID, відбиток пальця, блокування екрана або PIN ключа безпеки та повторіть спробу.",
  errWrongPasskey:
    "Це був інший passkey, не від цього облікового запису. Повторіть спробу та виберіть passkey цього облікового запису.",
  errNotRegistered:
    "Цей passkey не зареєстрований у реєстрі passkey (або зареєстровані ключі не відповідають його підпису). Створіть його заново на початковому пристрої або спершу зареєструйте.",
  errRegistrationCancelled: "Реєстрацію passkey скасовано: {message}",
  errNotSignedIn: "Вхід у гаманець не виконано",

  waCancelledCreate:
    "Створення passkey скасовано або час очікування вичерпано. Повторіть спробу та підтвердьте на пристрої за запитом.",
  waCancelledGet:
    "Вхід скасовано або час очікування вичерпано. Повторіть спробу та підтвердьте на пристрої за запитом.",
  waDuplicate: "На цьому пристрої у вас уже є обліковий запис. Виберіть «Увійти», щоб скористатися ним.",
  waNotSupportedCreate:
    "Цей пристрій не може створити passkey потрібного цьому гаманцю типу. Спробуйте інший пристрій або відскануйте телефоном QR-код для входу.",
  waNotSupportedGet:
    "Цей пристрій не може увійти з passkey. Спробуйте пристрій, на якому ви його створили, або відскануйте телефоном QR-код.",
  waConstraintCreate:
    "Перш ніж створити цей passkey, на пристрої чи ключі безпеки потрібно налаштувати PIN, відбиток пальця або розблокування обличчям. Додайте їх у налаштуваннях пристрою та повторіть.",
  waConstraintGet:
    "Для входу ключу безпеки потрібен PIN, а пристрою — блокування екрана. Налаштуйте та повторіть спробу.",
  waSecurity:
    "Цьому сайту зараз не дозволено використовувати passkey. Переконайтеся, що ви на правильному сайті й він завантажений через захищене з'єднання (https).",
  waGenericCreate:
    "Не вдалося створити passkey. Повторіть спробу та переконайтеся, що на пристрої налаштовано блокування екрана (Face ID, відбиток пальця або PIN).",
  waGenericGet:
    "Не вдалося увійти з passkey. Повторіть спробу на пристрої, де ви його створили.",
};

const pt: Catalog = {
  appTitle: "NEAR",
  appTagline: "Sem senha, sem frase de recuperação — apenas o seu dispositivo.",
  signUp: "Criar conta",
  signIn: "Entrar",

  addAccountTitle: "Adicionar outra conta",
  addAccountSubtitle: "Digite um nome de usuário ou email para diferenciar suas contas",
  usernameOrEmailPlaceholder: "nome de usuário ou email",
  continue: "Continuar",

  registrationFailedTitle: "Falha no registro",
  registrationNotRegisteredWarning:
    "Sua passkey foi criada, mas ainda não está registrada. Sem o registro, ela não pode ser recuperada em outros dispositivos.",
  retry: "Tentar novamente",
  cancel: "Cancelar",
  close: "Fechar",
  passkeyNotRegisteredTitle: "Passkey não registrada",

  createPasskeyTitle: "Crie sua passkey",
  createPasskeySubtitle: "Confirme no seu dispositivo quando solicitado",
  registeringTitle: "Registrando sua passkey",
  registeringSubtitle: "Publicando a chave pública na NEAR…",
  approveTxTitle: "Aprovar transação",
  approveTxSubtitle: "Confirme no seu dispositivo para aprovar.",
  approveBtn: "Aprovar",
  signMsgTitle: "Confirmar assinatura",
  signMsgSubtitle: "Confirme no seu dispositivo para assinar esta mensagem.",
  signBtn: "Assinar",
  confirmSignInTitle: "Confirmar entrada",
  confirmSignInSubtitle: "Confirme no seu dispositivo para entrar.",
  confirmSignInBtn: "Entrar",
  confirmSignInAgainSubtitle: "Confirme mais uma vez no seu dispositivo.",
  lookingUpTitle: "Procurando sua conta",
  lookingUpSubtitle: "Localizando sua passkey na NEAR…",
  signingInTitle: "Entrando",
  signingInFinalizeSubtitle: "Finalizando sua conta na NEAR…",
  signingInSetupSubtitle: "Configurando sua conta na NEAR…",
  usePasskeyTitle: "Use sua passkey",
  usePasskeySubtitle: "Escolha uma passkey e confirme no seu dispositivo",

  errOrphan:
    "Seu dispositivo criou uma passkey que esta carteira não pode usar. Abra as configurações de senhas / passkeys do seu dispositivo, exclua a passkey que você acabou de criar para este site e tente novamente em outro dispositivo.",
  errNonResident:
    "Seu dispositivo criou uma passkey que não poderá ser recuperada depois (não é uma chave residente). Tente outro dispositivo ou use seu telefone para criar a passkey.",
  errNotVerified:
    "Seu dispositivo entrou sem verificar que é você. Configure Face ID, impressão digital, bloqueio de tela ou PIN de chave de segurança e tente novamente.",
  errWrongPasskey:
    "Essa era uma passkey diferente da desta conta. Tente novamente e escolha a passkey desta conta.",
  errNotRegistered:
    "Esta passkey não está registrada no registro de passkeys (ou as chaves registradas não correspondem à sua assinatura). Crie-a novamente no dispositivo original ou registre-a primeiro.",
  errRegistrationCancelled: "Registro da passkey cancelado: {message}",
  errNotSignedIn: "Carteira não conectada",

  waCancelledCreate:
    "A criação da passkey foi cancelada ou expirou. Tente novamente e confirme no seu dispositivo quando solicitado.",
  waCancelledGet:
    "A entrada foi cancelada ou expirou. Tente novamente e confirme no seu dispositivo quando solicitado.",
  waDuplicate: "Você já tem uma conta neste dispositivo. Escolha «Entrar» para usá-la.",
  waNotSupportedCreate:
    "Este dispositivo não pode criar o tipo de passkey que esta carteira precisa. Tente outro dispositivo ou use seu telefone para ler o QR code de entrada.",
  waNotSupportedGet:
    "Este dispositivo não pode entrar com uma passkey. Tente o dispositivo onde você a criou ou use seu telefone para ler o QR code.",
  waConstraintCreate:
    "Seu dispositivo ou chave de segurança precisa de um PIN, impressão digital ou desbloqueio facial configurado antes de criar esta passkey. Adicione um nas configurações do dispositivo e tente novamente.",
  waConstraintGet:
    "Sua chave de segurança precisa de um PIN ou seu dispositivo precisa de um bloqueio de tela para entrar. Configure e tente novamente.",
  waSecurity:
    "Este site não tem permissão para usar passkeys agora. Verifique se você está no site correto e se ele está carregado por uma conexão segura (https).",
  waGenericCreate:
    "Algo deu errado ao criar sua passkey. Tente novamente e verifique se o bloqueio de tela do seu dispositivo (Face ID, impressão digital ou PIN) está configurado.",
  waGenericGet:
    "Algo deu errado ao entrar com sua passkey. Tente novamente no dispositivo onde você a criou.",
};

const de: Catalog = {
  appTitle: "NEAR",
  appTagline: "Kein Passwort, keine Seed-Phrase — nur dein Gerät.",
  signUp: "Registrieren",
  signIn: "Anmelden",

  addAccountTitle: "Weiteres Konto hinzufügen",
  addAccountSubtitle: "Gib einen Benutzernamen oder eine E-Mail ein, um deine Konten zu unterscheiden",
  usernameOrEmailPlaceholder: "Benutzername oder E-Mail",
  continue: "Weiter",

  registrationFailedTitle: "Registrierung fehlgeschlagen",
  registrationNotRegisteredWarning:
    "Dein Passkey wurde erstellt, ist aber noch nicht registriert. Ohne Registrierung kann er auf anderen Geräten nicht wiederhergestellt werden.",
  retry: "Erneut versuchen",
  cancel: "Abbrechen",
  close: "Schließen",
  passkeyNotRegisteredTitle: "Passkey nicht registriert",

  createPasskeyTitle: "Erstelle deinen Passkey",
  createPasskeySubtitle: "Bestätige auf deinem Gerät, wenn du dazu aufgefordert wirst",
  registeringTitle: "Passkey wird registriert",
  registeringSubtitle: "Sein öffentlicher Schlüssel wird auf NEAR veröffentlicht…",
  approveTxTitle: "Transaktion genehmigen",
  approveTxSubtitle: "Bestätige auf deinem Gerät, um zu genehmigen.",
  approveBtn: "Genehmigen",
  signMsgTitle: "Signatur bestätigen",
  signMsgSubtitle: "Bestätige auf deinem Gerät, um diese Nachricht zu signieren.",
  signBtn: "Signieren",
  confirmSignInTitle: "Anmeldung bestätigen",
  confirmSignInSubtitle: "Bestätige auf deinem Gerät, um dich anzumelden.",
  confirmSignInBtn: "Anmelden",
  confirmSignInAgainSubtitle: "Bestätige noch einmal auf deinem Gerät.",
  lookingUpTitle: "Dein Konto wird gesucht",
  lookingUpSubtitle: "Dein Passkey wird auf NEAR ermittelt…",
  signingInTitle: "Du wirst angemeldet",
  signingInFinalizeSubtitle: "Dein Konto wird auf NEAR fertiggestellt…",
  signingInSetupSubtitle: "Dein Konto wird auf NEAR eingerichtet…",
  usePasskeyTitle: "Verwende deinen Passkey",
  usePasskeySubtitle: "Wähle einen Passkey und bestätige auf deinem Gerät",

  errOrphan:
    "Dein Gerät hat einen Passkey erstellt, den diese Wallet nicht verwenden kann. Öffne die Passwort-/Passkey-Einstellungen deines Geräts, lösche den soeben für diese Website erstellten Passkey und versuche es auf einem anderen Gerät erneut.",
  errNonResident:
    "Dein Gerät hat einen Passkey erstellt, der später nicht wiederhergestellt werden kann (kein residenter Schlüssel). Versuche ein anderes Gerät oder erstelle den Passkey mit deinem Telefon.",
  errNotVerified:
    "Dein Gerät hat sich angemeldet, ohne zu bestätigen, dass du es bist. Richte Face ID, einen Fingerabdruck, eine Bildschirmsperre oder eine Sicherheitsschlüssel-PIN ein und versuche es erneut.",
  errWrongPasskey:
    "Das war ein anderer Passkey als der dieses Kontos. Versuche es erneut und wähle den Passkey dieses Kontos.",
  errNotRegistered:
    "Dieser Passkey ist nicht im Passkey-Register registriert (oder die registrierten Schlüssel passen nicht zu seiner Signatur). Erstelle ihn erneut auf dem ursprünglichen Gerät oder registriere ihn zuerst.",
  errRegistrationCancelled: "Passkey-Registrierung abgebrochen: {message}",
  errNotSignedIn: "Nicht in der Wallet angemeldet",

  waCancelledCreate:
    "Die Passkey-Erstellung wurde abgebrochen oder ist abgelaufen. Versuche es erneut und bestätige auf deinem Gerät, wenn du dazu aufgefordert wirst.",
  waCancelledGet:
    "Die Anmeldung wurde abgebrochen oder ist abgelaufen. Versuche es erneut und bestätige auf deinem Gerät, wenn du dazu aufgefordert wirst.",
  waDuplicate: "Du hast bereits ein Konto auf diesem Gerät. Wähle „Anmelden“, um es zu verwenden.",
  waNotSupportedCreate:
    "Dieses Gerät kann den von dieser Wallet benötigten Passkey-Typ nicht erstellen. Versuche ein anderes Gerät oder scanne den Anmelde-QR-Code mit deinem Telefon.",
  waNotSupportedGet:
    "Dieses Gerät kann sich nicht mit einem Passkey anmelden. Versuche das Gerät, auf dem du ihn erstellt hast, oder scanne den QR-Code mit deinem Telefon.",
  waConstraintCreate:
    "Dein Gerät oder Sicherheitsschlüssel benötigt eine eingerichtete PIN, einen Fingerabdruck oder Face Unlock, bevor dieser Passkey erstellt werden kann. Richte eine in den Geräteeinstellungen ein und versuche es erneut.",
  waConstraintGet:
    "Dein Sicherheitsschlüssel benötigt eine PIN oder dein Gerät eine Bildschirmsperre zum Anmelden. Richte sie ein und versuche es erneut.",
  waSecurity:
    "Diese Website darf derzeit keine Passkeys verwenden. Stelle sicher, dass du auf der richtigen Website bist und sie über eine sichere Verbindung (https) geladen wurde.",
  waGenericCreate:
    "Beim Erstellen deines Passkeys ist ein Fehler aufgetreten. Versuche es erneut und stelle sicher, dass die Bildschirmsperre deines Geräts (Face ID, Fingerabdruck oder PIN) eingerichtet ist.",
  waGenericGet:
    "Bei der Anmeldung mit deinem Passkey ist ein Fehler aufgetreten. Versuche es erneut auf dem Gerät, auf dem du ihn erstellt hast.",
};

const it: Catalog = {
  appTitle: "NEAR",
  appTagline: "Nessuna password, nessuna seed phrase — solo il tuo dispositivo.",
  signUp: "Registrati",
  signIn: "Accedi",

  addAccountTitle: "Aggiungi un altro account",
  addAccountSubtitle: "Inserisci un nome utente o un'email per distinguere i tuoi account",
  usernameOrEmailPlaceholder: "nome utente o email",
  continue: "Continua",

  registrationFailedTitle: "Registrazione non riuscita",
  registrationNotRegisteredWarning:
    "La tua passkey è stata creata ma non è ancora registrata. Senza registrazione non può essere recuperata su altri dispositivi.",
  retry: "Riprova",
  cancel: "Annulla",
  close: "Chiudi",
  passkeyNotRegisteredTitle: "Passkey non registrata",

  createPasskeyTitle: "Crea la tua passkey",
  createPasskeySubtitle: "Conferma sul tuo dispositivo quando richiesto",
  registeringTitle: "Registrazione della passkey",
  registeringSubtitle: "Pubblicazione della sua chiave pubblica su NEAR…",
  approveTxTitle: "Approva la transazione",
  approveTxSubtitle: "Conferma sul tuo dispositivo per approvare.",
  approveBtn: "Approva",
  signMsgTitle: "Conferma la firma",
  signMsgSubtitle: "Conferma sul tuo dispositivo per firmare questo messaggio.",
  signBtn: "Firma",
  confirmSignInTitle: "Conferma l'accesso",
  confirmSignInSubtitle: "Conferma sul tuo dispositivo per accedere.",
  confirmSignInBtn: "Accedi",
  confirmSignInAgainSubtitle: "Conferma ancora una volta sul tuo dispositivo.",
  lookingUpTitle: "Ricerca del tuo account",
  lookingUpSubtitle: "Individuazione della tua passkey su NEAR…",
  signingInTitle: "Accesso in corso",
  signingInFinalizeSubtitle: "Completamento del tuo account su NEAR…",
  signingInSetupSubtitle: "Configurazione del tuo account su NEAR…",
  usePasskeyTitle: "Usa la tua passkey",
  usePasskeySubtitle: "Scegli una passkey e conferma sul tuo dispositivo",

  errOrphan:
    "Il tuo dispositivo ha creato una passkey che questo wallet non può usare. Apri le impostazioni password / passkey del dispositivo, elimina la passkey appena creata per questo sito e riprova su un altro dispositivo.",
  errNonResident:
    "Il tuo dispositivo ha creato una passkey che non potrà essere recuperata in seguito (non è una chiave residente). Prova un altro dispositivo o usa il telefono per creare la passkey.",
  errNotVerified:
    "Il tuo dispositivo ha effettuato l'accesso senza verificare la tua identità. Configura Face ID, un'impronta, un blocco schermo o un PIN della chiave di sicurezza e riprova.",
  errWrongPasskey:
    "Questa era una passkey diversa da quella di questo account. Riprova e scegli la passkey di questo account.",
  errNotRegistered:
    "Questa passkey non è registrata nel registro delle passkey (o le chiavi registrate non corrispondono alla sua firma). Creala di nuovo sul dispositivo originale o registrala prima.",
  errRegistrationCancelled: "Registrazione della passkey annullata: {message}",
  errNotSignedIn: "Wallet non connesso",

  waCancelledCreate:
    "La creazione della passkey è stata annullata o è scaduta. Riprova e conferma sul tuo dispositivo quando richiesto.",
  waCancelledGet:
    "L'accesso è stato annullato o è scaduto. Riprova e conferma sul tuo dispositivo quando richiesto.",
  waDuplicate: "Hai già un account su questo dispositivo. Scegli «Accedi» per usarlo.",
  waNotSupportedCreate:
    "Questo dispositivo non può creare il tipo di passkey richiesto da questo wallet. Prova un altro dispositivo o usa il telefono per scansionare il codice QR di accesso.",
  waNotSupportedGet:
    "Questo dispositivo non può accedere con una passkey. Prova il dispositivo su cui l'hai creata o usa il telefono per scansionare il codice QR.",
  waConstraintCreate:
    "Il tuo dispositivo o la chiave di sicurezza necessita di un PIN, un'impronta o lo sblocco col volto prima di poter creare questa passkey. Aggiungine uno nelle impostazioni del dispositivo e riprova.",
  waConstraintGet:
    "La tua chiave di sicurezza necessita di un PIN o il dispositivo di un blocco schermo per accedere. Configuralo e riprova.",
  waSecurity:
    "A questo sito al momento non è consentito usare le passkey. Assicurati di essere sul sito corretto e che sia caricato tramite una connessione sicura (https).",
  waGenericCreate:
    "Qualcosa è andato storto durante la creazione della passkey. Riprova e assicurati che il blocco schermo del dispositivo (Face ID, impronta o PIN) sia configurato.",
  waGenericGet:
    "Qualcosa è andato storto durante l'accesso con la passkey. Riprova sul dispositivo su cui l'hai creata.",
};

const pl: Catalog = {
  appTitle: "NEAR",
  appTagline: "Bez hasła, bez frazy seed — tylko Twoje urządzenie.",
  signUp: "Zarejestruj się",
  signIn: "Zaloguj się",

  addAccountTitle: "Dodaj kolejne konto",
  addAccountSubtitle: "Wpisz nazwę użytkownika lub e-mail, aby rozróżnić konta",
  usernameOrEmailPlaceholder: "nazwa użytkownika lub e-mail",
  continue: "Kontynuuj",

  registrationFailedTitle: "Rejestracja nie powiodła się",
  registrationNotRegisteredWarning:
    "Twój passkey został utworzony, ale nie jest jeszcze zarejestrowany. Bez rejestracji nie można go odzyskać na innych urządzeniach.",
  retry: "Ponów",
  cancel: "Anuluj",
  close: "Zamknij",
  passkeyNotRegisteredTitle: "Passkey nie zarejestrowany",

  createPasskeyTitle: "Utwórz swój passkey",
  createPasskeySubtitle: "Potwierdź na urządzeniu, gdy pojawi się prośba",
  registeringTitle: "Rejestrowanie passkey",
  registeringSubtitle: "Publikowanie jego klucza publicznego w NEAR…",
  approveTxTitle: "Zatwierdź transakcję",
  approveTxSubtitle: "Potwierdź na urządzeniu, aby zatwierdzić.",
  approveBtn: "Zatwierdź",
  signMsgTitle: "Potwierdź podpis",
  signMsgSubtitle: "Potwierdź na urządzeniu, aby podpisać tę wiadomość.",
  signBtn: "Podpisz",
  confirmSignInTitle: "Potwierdź logowanie",
  confirmSignInSubtitle: "Potwierdź na urządzeniu, aby się zalogować.",
  confirmSignInBtn: "Zaloguj się",
  confirmSignInAgainSubtitle: "Potwierdź jeszcze raz na urządzeniu.",
  lookingUpTitle: "Wyszukiwanie Twojego konta",
  lookingUpSubtitle: "Ustalanie Twojego passkey w NEAR…",
  signingInTitle: "Logowanie",
  signingInFinalizeSubtitle: "Finalizowanie Twojego konta w NEAR…",
  signingInSetupSubtitle: "Konfigurowanie Twojego konta w NEAR…",
  usePasskeyTitle: "Użyj swojego passkey",
  usePasskeySubtitle: "Wybierz passkey i potwierdź na urządzeniu",

  errOrphan:
    "Twoje urządzenie utworzyło passkey, którego ten portfel nie może użyć. Otwórz ustawienia haseł / passkey na urządzeniu, usuń passkey właśnie utworzony dla tej witryny, a następnie spróbuj ponownie na innym urządzeniu.",
  errNonResident:
    "Twoje urządzenie utworzyło passkey, którego nie będzie można później odzyskać (to nie jest klucz rezydentny). Wypróbuj inne urządzenie lub utwórz passkey za pomocą telefonu.",
  errNotVerified:
    "Twoje urządzenie zalogowało się bez potwierdzenia, że to Ty. Skonfiguruj Face ID, odcisk palca, blokadę ekranu lub PIN klucza bezpieczeństwa i spróbuj ponownie.",
  errWrongPasskey:
    "To był inny passkey niż dla tego konta. Spróbuj ponownie i wybierz passkey tego konta.",
  errNotRegistered:
    "Ten passkey nie jest zarejestrowany w rejestrze passkey (lub zarejestrowane klucze nie pasują do jego podpisu). Utwórz go ponownie na pierwotnym urządzeniu lub najpierw zarejestruj.",
  errRegistrationCancelled: "Rejestracja passkey anulowana: {message}",
  errNotSignedIn: "Nie zalogowano do portfela",

  waCancelledCreate:
    "Tworzenie passkey zostało anulowane lub upłynął limit czasu. Spróbuj ponownie i potwierdź na urządzeniu, gdy pojawi się prośba.",
  waCancelledGet:
    "Logowanie zostało anulowane lub upłynął limit czasu. Spróbuj ponownie i potwierdź na urządzeniu, gdy pojawi się prośba.",
  waDuplicate: "Masz już konto na tym urządzeniu. Wybierz „Zaloguj się”, aby go użyć.",
  waNotSupportedCreate:
    "To urządzenie nie może utworzyć typu passkey wymaganego przez ten portfel. Wypróbuj inne urządzenie lub zeskanuj telefonem kod QR logowania.",
  waNotSupportedGet:
    "To urządzenie nie może zalogować się za pomocą passkey. Wypróbuj urządzenie, na którym go utworzyłeś, lub zeskanuj telefonem kod QR.",
  waConstraintCreate:
    "Twoje urządzenie lub klucz bezpieczeństwa wymaga skonfigurowanego kodu PIN, odcisku palca lub odblokowania twarzą, zanim będzie mogło utworzyć ten passkey. Dodaj je w ustawieniach urządzenia i spróbuj ponownie.",
  waConstraintGet:
    "Twój klucz bezpieczeństwa wymaga kodu PIN, a urządzenie blokady ekranu, aby się zalogować. Skonfiguruj to i spróbuj ponownie.",
  waSecurity:
    "Ta witryna nie może teraz używać passkey. Upewnij się, że jesteś na właściwej witrynie i że jest ona załadowana przez bezpieczne połączenie (https).",
  waGenericCreate:
    "Coś poszło nie tak podczas tworzenia passkey. Spróbuj ponownie i upewnij się, że blokada ekranu urządzenia (Face ID, odcisk palca lub PIN) jest skonfigurowana.",
  waGenericGet:
    "Coś poszło nie tak podczas logowania za pomocą passkey. Spróbuj ponownie na urządzeniu, na którym go utworzyłeś.",
};

const nl: Catalog = {
  appTitle: "NEAR",
  appTagline: "Geen wachtwoord, geen seed-zin — alleen je apparaat.",
  signUp: "Registreren",
  signIn: "Inloggen",

  addAccountTitle: "Nog een account toevoegen",
  addAccountSubtitle: "Voer een gebruikersnaam of e-mail in om je accounts te onderscheiden",
  usernameOrEmailPlaceholder: "gebruikersnaam of e-mail",
  continue: "Doorgaan",

  registrationFailedTitle: "Registratie mislukt",
  registrationNotRegisteredWarning:
    "Je passkey is aangemaakt maar nog niet geregistreerd. Zonder registratie kan hij niet op andere apparaten worden hersteld.",
  retry: "Opnieuw proberen",
  cancel: "Annuleren",
  close: "Sluiten",
  passkeyNotRegisteredTitle: "Passkey niet geregistreerd",

  createPasskeyTitle: "Maak je passkey aan",
  createPasskeySubtitle: "Bevestig op je apparaat wanneer daarom wordt gevraagd",
  registeringTitle: "Je passkey wordt geregistreerd",
  registeringSubtitle: "De openbare sleutel wordt op NEAR gepubliceerd…",
  approveTxTitle: "Transactie goedkeuren",
  approveTxSubtitle: "Bevestig op je apparaat om goed te keuren.",
  approveBtn: "Goedkeuren",
  signMsgTitle: "Handtekening bevestigen",
  signMsgSubtitle: "Bevestig op je apparaat om dit bericht te ondertekenen.",
  signBtn: "Ondertekenen",
  confirmSignInTitle: "Inloggen bevestigen",
  confirmSignInSubtitle: "Bevestig op je apparaat om in te loggen.",
  confirmSignInBtn: "Inloggen",
  confirmSignInAgainSubtitle: "Bevestig nog een keer op je apparaat.",
  lookingUpTitle: "Je account wordt gezocht",
  lookingUpSubtitle: "Je passkey wordt op NEAR opgezocht…",
  signingInTitle: "Je wordt ingelogd",
  signingInFinalizeSubtitle: "Je account wordt op NEAR afgerond…",
  signingInSetupSubtitle: "Je account wordt op NEAR ingesteld…",
  usePasskeyTitle: "Gebruik je passkey",
  usePasskeySubtitle: "Kies een passkey en bevestig op je apparaat",

  errOrphan:
    "Je apparaat heeft een passkey aangemaakt die deze wallet niet kan gebruiken. Open de wachtwoord-/passkey-instellingen van je apparaat, verwijder de passkey die je zojuist voor deze site hebt aangemaakt en probeer het opnieuw op een ander apparaat.",
  errNonResident:
    "Je apparaat heeft een passkey aangemaakt die later niet kan worden hersteld (het is geen resident key). Probeer een ander apparaat of maak de passkey met je telefoon aan.",
  errNotVerified:
    "Je apparaat is ingelogd zonder te verifiëren dat jij het bent. Stel Face ID, een vingerafdruk, een schermvergrendeling of een pincode voor een beveiligingssleutel in en probeer het opnieuw.",
  errWrongPasskey:
    "Dat was een andere passkey dan die van dit account. Probeer het opnieuw en kies de passkey van dit account.",
  errNotRegistered:
    "Deze passkey is niet geregistreerd in het passkey-register (of de geregistreerde sleutels komen niet overeen met de handtekening). Maak hem opnieuw aan op het oorspronkelijke apparaat of registreer hem eerst.",
  errRegistrationCancelled: "Passkey-registratie geannuleerd: {message}",
  errNotSignedIn: "Niet ingelogd in wallet",

  waCancelledCreate:
    "Het aanmaken van de passkey is geannuleerd of verlopen. Probeer het opnieuw en bevestig op je apparaat wanneer daarom wordt gevraagd.",
  waCancelledGet:
    "Het inloggen is geannuleerd of verlopen. Probeer het opnieuw en bevestig op je apparaat wanneer daarom wordt gevraagd.",
  waDuplicate: "Je hebt al een account op dit apparaat. Kies „Inloggen” om het te gebruiken.",
  waNotSupportedCreate:
    "Dit apparaat kan niet het type passkey aanmaken dat deze wallet nodig heeft. Probeer een ander apparaat of scan de inlog-QR-code met je telefoon.",
  waNotSupportedGet:
    "Dit apparaat kan niet inloggen met een passkey. Probeer het apparaat waarop je hem hebt aangemaakt of scan de QR-code met je telefoon.",
  waConstraintCreate:
    "Je apparaat of beveiligingssleutel heeft een ingestelde pincode, vingerafdruk of gezichtsontgrendeling nodig voordat deze passkey kan worden aangemaakt. Voeg er een toe in de apparaatinstellingen en probeer het opnieuw.",
  waConstraintGet:
    "Je beveiligingssleutel heeft een pincode nodig of je apparaat een schermvergrendeling om in te loggen. Stel het in en probeer het opnieuw.",
  waSecurity:
    "Deze site mag momenteel geen passkeys gebruiken. Zorg dat je op de juiste website bent en dat deze via een beveiligde verbinding (https) is geladen.",
  waGenericCreate:
    "Er ging iets mis bij het aanmaken van je passkey. Probeer het opnieuw en zorg dat de schermvergrendeling van je apparaat (Face ID, vingerafdruk of pincode) is ingesteld.",
  waGenericGet:
    "Er ging iets mis bij het inloggen met je passkey. Probeer het opnieuw op het apparaat waarop je hem hebt aangemaakt.",
};

const tr: Catalog = {
  appTitle: "NEAR",
  appTagline: "Parola yok, kurtarma ifadesi yok — yalnızca cihazınız.",
  signUp: "Kaydol",
  signIn: "Oturum aç",

  addAccountTitle: "Başka bir hesap ekle",
  addAccountSubtitle: "Hesaplarınızı ayırt etmek için bir kullanıcı adı veya e-posta girin",
  usernameOrEmailPlaceholder: "kullanıcı adı veya e-posta",
  continue: "Devam",

  registrationFailedTitle: "Kayıt başarısız",
  registrationNotRegisteredWarning:
    "Geçiş anahtarınız oluşturuldu ancak henüz kaydedilmedi. Kayıt olmadan başka cihazlarda kurtarılamaz.",
  retry: "Yeniden dene",
  cancel: "İptal",
  close: "Kapat",
  passkeyNotRegisteredTitle: "Geçiş anahtarı kayıtlı değil",

  createPasskeyTitle: "Geçiş anahtarınızı oluşturun",
  createPasskeySubtitle: "İstendiğinde cihazınızla onaylayın",
  registeringTitle: "Geçiş anahtarınız kaydediliyor",
  registeringSubtitle: "Genel anahtarı NEAR'da yayımlanıyor…",
  approveTxTitle: "İşlemi onayla",
  approveTxSubtitle: "Onaylamak için cihazınızla doğrulayın.",
  approveBtn: "Onayla",
  signMsgTitle: "İmzayı onayla",
  signMsgSubtitle: "Bu mesajı imzalamak için cihazınızla doğrulayın.",
  signBtn: "İmzala",
  confirmSignInTitle: "Oturum açmayı onayla",
  confirmSignInSubtitle: "Oturum açmak için cihazınızla doğrulayın.",
  confirmSignInBtn: "Oturum aç",
  confirmSignInAgainSubtitle: "Cihazınızla bir kez daha doğrulayın.",
  lookingUpTitle: "Hesabınız aranıyor",
  lookingUpSubtitle: "Geçiş anahtarınız NEAR'da çözümleniyor…",
  signingInTitle: "Oturumunuz açılıyor",
  signingInFinalizeSubtitle: "Hesabınız NEAR'da tamamlanıyor…",
  signingInSetupSubtitle: "Hesabınız NEAR'da kuruluyor…",
  usePasskeyTitle: "Geçiş anahtarınızı kullanın",
  usePasskeySubtitle: "Bir geçiş anahtarı seçin ve cihazınızla onaylayın",

  errOrphan:
    "Cihazınız bu cüzdanın kullanamayacağı bir geçiş anahtarı oluşturdu. Cihazınızın parola / geçiş anahtarı ayarlarını açın, bu site için az önce oluşturduğunuz geçiş anahtarını silin, ardından başka bir cihazda yeniden deneyin.",
  errNonResident:
    "Cihazınız daha sonra kurtarılamayacak bir geçiş anahtarı oluşturdu (yerleşik anahtar değil). Başka bir cihaz deneyin veya geçiş anahtarını telefonunuzla oluşturun.",
  errNotVerified:
    "Cihazınız kimliğinizi doğrulamadan oturum açtı. Lütfen Face ID, parmak izi, ekran kilidi veya bir güvenlik anahtarı PIN'i ayarlayın, ardından yeniden deneyin.",
  errWrongPasskey:
    "Bu, bu hesaptan farklı bir geçiş anahtarıydı. Yeniden deneyin ve bu hesabın geçiş anahtarını seçin.",
  errNotRegistered:
    "Bu geçiş anahtarı geçiş anahtarı kayıt defterinde kayıtlı değil (veya kayıtlı anahtarlar imzasıyla eşleşmiyor). Orijinal cihazda yeniden oluşturun veya önce kaydedin.",
  errRegistrationCancelled: "Geçiş anahtarı kaydı iptal edildi: {message}",
  errNotSignedIn: "Cüzdanda oturum açılmadı",

  waCancelledCreate:
    "Geçiş anahtarı oluşturma iptal edildi veya zaman aşımına uğradı. Yeniden deneyin ve istendiğinde cihazınızla onaylayın.",
  waCancelledGet:
    "Oturum açma iptal edildi veya zaman aşımına uğradı. Yeniden deneyin ve istendiğinde cihazınızla onaylayın.",
  waDuplicate: "Bu cihazda zaten bir hesabınız var. Kullanmak için «Oturum aç»ı seçin.",
  waNotSupportedCreate:
    "Bu cihaz bu cüzdanın ihtiyaç duyduğu türde geçiş anahtarı oluşturamaz. Başka bir cihaz deneyin veya oturum açma QR kodunu telefonunuzla tarayın.",
  waNotSupportedGet:
    "Bu cihaz geçiş anahtarıyla oturum açamaz. Onu oluşturduğunuz cihazı deneyin veya QR kodunu telefonunuzla tarayın.",
  waConstraintCreate:
    "Bu geçiş anahtarını oluşturabilmesi için cihazınızın veya güvenlik anahtarınızın ayarlanmış bir PIN, parmak izi veya yüz kilidine ihtiyacı var. Cihaz ayarlarından birini ekleyin ve yeniden deneyin.",
  waConstraintGet:
    "Oturum açmak için güvenlik anahtarınızın bir PIN'e veya cihazınızın bir ekran kilidine ihtiyacı var. Ayarlayın ve yeniden deneyin.",
  waSecurity:
    "Bu sitenin şu anda geçiş anahtarı kullanmasına izin verilmiyor. Doğru web sitesinde olduğunuzdan ve güvenli (https) bir bağlantı üzerinden yüklendiğinden emin olun.",
  waGenericCreate:
    "Geçiş anahtarınız oluşturulurken bir sorun oluştu. Yeniden deneyin ve cihazınızın ekran kilidinin (Face ID, parmak izi veya PIN) ayarlı olduğundan emin olun.",
  waGenericGet:
    "Geçiş anahtarınızla oturum açılırken bir sorun oluştu. Onu oluşturduğunuz cihazda yeniden deneyin.",
};

const id: Catalog = {
  appTitle: "NEAR",
  appTagline: "Tanpa kata sandi, tanpa frasa pemulihan — cukup perangkat Anda.",
  signUp: "Daftar",
  signIn: "Masuk",

  addAccountTitle: "Tambah akun lain",
  addAccountSubtitle: "Masukkan nama pengguna atau email untuk membedakan akun Anda",
  usernameOrEmailPlaceholder: "nama pengguna atau email",
  continue: "Lanjutkan",

  registrationFailedTitle: "Pendaftaran gagal",
  registrationNotRegisteredWarning:
    "Passkey Anda telah dibuat tetapi belum terdaftar. Tanpa pendaftaran, passkey tidak dapat dipulihkan di perangkat lain.",
  retry: "Coba lagi",
  cancel: "Batal",
  close: "Tutup",
  passkeyNotRegisteredTitle: "Passkey belum terdaftar",

  createPasskeyTitle: "Buat passkey Anda",
  createPasskeySubtitle: "Konfirmasi di perangkat Anda saat diminta",
  registeringTitle: "Mendaftarkan passkey Anda",
  registeringSubtitle: "Menerbitkan kunci publiknya di NEAR…",
  approveTxTitle: "Setujui transaksi",
  approveTxSubtitle: "Konfirmasi di perangkat Anda untuk menyetujui.",
  approveBtn: "Setujui",
  signMsgTitle: "Konfirmasi tanda tangan",
  signMsgSubtitle: "Konfirmasi di perangkat Anda untuk menandatangani pesan ini.",
  signBtn: "Tanda tangani",
  confirmSignInTitle: "Konfirmasi masuk",
  confirmSignInSubtitle: "Konfirmasi di perangkat Anda untuk masuk.",
  confirmSignInBtn: "Masuk",
  confirmSignInAgainSubtitle: "Konfirmasi sekali lagi di perangkat Anda.",
  lookingUpTitle: "Mencari akun Anda",
  lookingUpSubtitle: "Menemukan passkey Anda di NEAR…",
  signingInTitle: "Memasukkan Anda",
  signingInFinalizeSubtitle: "Menyelesaikan akun Anda di NEAR…",
  signingInSetupSubtitle: "Menyiapkan akun Anda di NEAR…",
  usePasskeyTitle: "Gunakan passkey Anda",
  usePasskeySubtitle: "Pilih passkey dan konfirmasi di perangkat Anda",

  errOrphan:
    "Perangkat Anda membuat passkey yang tidak dapat digunakan dompet ini. Buka pengaturan kata sandi / passkey perangkat Anda, hapus passkey yang baru saja Anda buat untuk situs ini, lalu coba lagi di perangkat lain.",
  errNonResident:
    "Perangkat Anda membuat passkey yang tidak dapat dipulihkan nanti (bukan kunci residen). Coba perangkat lain atau gunakan ponsel Anda untuk membuat passkey.",
  errNotVerified:
    "Perangkat Anda masuk tanpa memverifikasi bahwa itu Anda. Silakan atur Face ID, sidik jari, kunci layar, atau PIN kunci keamanan, lalu coba lagi.",
  errWrongPasskey:
    "Itu passkey yang berbeda dari akun ini. Coba lagi dan pilih passkey akun ini.",
  errNotRegistered:
    "Passkey ini tidak terdaftar di registri passkey (atau kunci terdaftar tidak cocok dengan tanda tangannya). Buat lagi di perangkat asli atau daftarkan terlebih dahulu.",
  errRegistrationCancelled: "Pendaftaran passkey dibatalkan: {message}",
  errNotSignedIn: "Belum masuk ke dompet",

  waCancelledCreate:
    "Pembuatan passkey dibatalkan atau kedaluwarsa. Coba lagi dan konfirmasi di perangkat Anda saat diminta.",
  waCancelledGet:
    "Masuk dibatalkan atau kedaluwarsa. Coba lagi dan konfirmasi di perangkat Anda saat diminta.",
  waDuplicate: "Anda sudah memiliki akun di perangkat ini. Pilih «Masuk» untuk menggunakannya.",
  waNotSupportedCreate:
    "Perangkat ini tidak dapat membuat jenis passkey yang dibutuhkan dompet ini. Coba perangkat lain, atau gunakan ponsel Anda untuk memindai kode QR masuk.",
  waNotSupportedGet:
    "Perangkat ini tidak dapat masuk dengan passkey. Coba perangkat tempat Anda membuatnya, atau gunakan ponsel Anda untuk memindai kode QR.",
  waConstraintCreate:
    "Perangkat atau kunci keamanan Anda memerlukan PIN, sidik jari, atau buka kunci wajah yang telah diatur sebelum dapat membuat passkey ini. Tambahkan salah satunya di pengaturan perangkat dan coba lagi.",
  waConstraintGet:
    "Kunci keamanan Anda memerlukan PIN atau perangkat Anda memerlukan kunci layar untuk masuk. Atur dan coba lagi.",
  waSecurity:
    "Situs ini saat ini tidak diizinkan menggunakan passkey. Pastikan Anda berada di situs web yang benar dan dimuat melalui koneksi aman (https).",
  waGenericCreate:
    "Terjadi kesalahan saat membuat passkey Anda. Coba lagi, dan pastikan kunci layar perangkat Anda (Face ID, sidik jari, atau PIN) telah diatur.",
  waGenericGet:
    "Terjadi kesalahan saat masuk dengan passkey Anda. Coba lagi di perangkat tempat Anda membuatnya.",
};

const vi: Catalog = {
  appTitle: "NEAR",
  appTagline: "Không mật khẩu, không cụm từ khôi phục — chỉ thiết bị của bạn.",
  signUp: "Đăng ký",
  signIn: "Đăng nhập",

  addAccountTitle: "Thêm tài khoản khác",
  addAccountSubtitle: "Nhập tên người dùng hoặc email để phân biệt các tài khoản",
  usernameOrEmailPlaceholder: "tên người dùng hoặc email",
  continue: "Tiếp tục",

  registrationFailedTitle: "Đăng ký thất bại",
  registrationNotRegisteredWarning:
    "Passkey của bạn đã được tạo nhưng chưa được đăng ký. Nếu không đăng ký, không thể khôi phục nó trên các thiết bị khác.",
  retry: "Thử lại",
  cancel: "Hủy",
  close: "Đóng",
  passkeyNotRegisteredTitle: "Passkey chưa được đăng ký",

  createPasskeyTitle: "Tạo passkey của bạn",
  createPasskeySubtitle: "Xác nhận trên thiết bị khi được yêu cầu",
  registeringTitle: "Đang đăng ký passkey của bạn",
  registeringSubtitle: "Đang công bố khóa công khai của nó trên NEAR…",
  approveTxTitle: "Phê duyệt giao dịch",
  approveTxSubtitle: "Xác nhận trên thiết bị để phê duyệt.",
  approveBtn: "Phê duyệt",
  signMsgTitle: "Xác nhận chữ ký",
  signMsgSubtitle: "Xác nhận trên thiết bị để ký tin nhắn này.",
  signBtn: "Ký",
  confirmSignInTitle: "Xác nhận đăng nhập",
  confirmSignInSubtitle: "Xác nhận trên thiết bị để đăng nhập.",
  confirmSignInBtn: "Đăng nhập",
  confirmSignInAgainSubtitle: "Xác nhận thêm một lần nữa trên thiết bị.",
  lookingUpTitle: "Đang tìm tài khoản của bạn",
  lookingUpSubtitle: "Đang xác định passkey của bạn trên NEAR…",
  signingInTitle: "Đang đăng nhập",
  signingInFinalizeSubtitle: "Đang hoàn tất tài khoản của bạn trên NEAR…",
  signingInSetupSubtitle: "Đang thiết lập tài khoản của bạn trên NEAR…",
  usePasskeyTitle: "Dùng passkey của bạn",
  usePasskeySubtitle: "Chọn một passkey và xác nhận trên thiết bị",

  errOrphan:
    "Thiết bị của bạn đã tạo một passkey mà ví này không thể dùng. Vui lòng mở cài đặt mật khẩu / passkey của thiết bị, xóa passkey bạn vừa tạo cho trang này, rồi thử lại trên thiết bị khác.",
  errNonResident:
    "Thiết bị của bạn đã tạo một passkey không thể khôi phục sau này (không phải khóa thường trú). Hãy thử thiết bị khác hoặc dùng điện thoại để tạo passkey.",
  errNotVerified:
    "Thiết bị của bạn đã đăng nhập mà không xác minh danh tính. Vui lòng thiết lập Face ID, vân tay, khóa màn hình hoặc mã PIN khóa bảo mật, rồi thử lại.",
  errWrongPasskey:
    "Đó là một passkey khác với tài khoản này. Vui lòng thử lại và chọn passkey của tài khoản này.",
  errNotRegistered:
    "Passkey này chưa được đăng ký trong sổ đăng ký passkey (hoặc các khóa đã đăng ký không khớp với chữ ký của nó). Hãy tạo lại trên thiết bị gốc hoặc đăng ký trước.",
  errRegistrationCancelled: "Đã hủy đăng ký passkey: {message}",
  errNotSignedIn: "Chưa đăng nhập ví",

  waCancelledCreate:
    "Việc tạo passkey đã bị hủy hoặc hết thời gian. Vui lòng thử lại và xác nhận trên thiết bị khi được yêu cầu.",
  waCancelledGet:
    "Việc đăng nhập đã bị hủy hoặc hết thời gian. Vui lòng thử lại và xác nhận trên thiết bị khi được yêu cầu.",
  waDuplicate: "Bạn đã có tài khoản trên thiết bị này. Chọn «Đăng nhập» để dùng nó.",
  waNotSupportedCreate:
    "Thiết bị này không thể tạo loại passkey mà ví này cần. Hãy thử thiết bị khác, hoặc dùng điện thoại để quét mã QR đăng nhập.",
  waNotSupportedGet:
    "Thiết bị này không thể đăng nhập bằng passkey. Hãy thử thiết bị nơi bạn đã tạo nó, hoặc dùng điện thoại để quét mã QR.",
  waConstraintCreate:
    "Thiết bị hoặc khóa bảo mật của bạn cần thiết lập mã PIN, vân tay hoặc mở khóa khuôn mặt trước khi có thể tạo passkey này. Hãy thêm một trong cài đặt thiết bị và thử lại.",
  waConstraintGet:
    "Khóa bảo mật của bạn cần mã PIN hoặc thiết bị của bạn cần khóa màn hình để đăng nhập. Hãy thiết lập và thử lại.",
  waSecurity:
    "Trang này hiện không được phép dùng passkey. Hãy đảm bảo bạn đang ở đúng trang web và nó được tải qua kết nối an toàn (https).",
  waGenericCreate:
    "Đã xảy ra lỗi khi tạo passkey của bạn. Vui lòng thử lại và đảm bảo khóa màn hình thiết bị (Face ID, vân tay hoặc PIN) đã được thiết lập.",
  waGenericGet:
    "Đã xảy ra lỗi khi đăng nhập bằng passkey. Vui lòng thử lại trên thiết bị nơi bạn đã tạo nó.",
};

const ja: Catalog = {
  appTitle: "NEAR",
  appTagline: "パスワードもシードフレーズも不要 — あなたのデバイスだけ。",
  signUp: "新規登録",
  signIn: "サインイン",

  addAccountTitle: "別のアカウントを追加",
  addAccountSubtitle: "アカウントを区別するためにユーザー名またはメールを入力してください",
  usernameOrEmailPlaceholder: "ユーザー名またはメール",
  continue: "続ける",

  registrationFailedTitle: "登録に失敗しました",
  registrationNotRegisteredWarning:
    "パスキーは作成されましたが、まだ登録されていません。登録しないと他のデバイスで復元できません。",
  retry: "再試行",
  cancel: "キャンセル",
  close: "閉じる",
  passkeyNotRegisteredTitle: "パスキーが登録されていません",

  createPasskeyTitle: "パスキーを作成",
  createPasskeySubtitle: "求められたらデバイスで確認してください",
  registeringTitle: "パスキーを登録しています",
  registeringSubtitle: "公開鍵を NEAR に公開しています…",
  approveTxTitle: "取引を承認",
  approveTxSubtitle: "承認するにはデバイスで確認してください。",
  approveBtn: "承認",
  signMsgTitle: "署名を確認",
  signMsgSubtitle: "このメッセージに署名するにはデバイスで確認してください。",
  signBtn: "署名",
  confirmSignInTitle: "サインインを確認",
  confirmSignInSubtitle: "サインインするにはデバイスで確認してください。",
  confirmSignInBtn: "サインイン",
  confirmSignInAgainSubtitle: "デバイスでもう一度確認してください。",
  lookingUpTitle: "アカウントを検索しています",
  lookingUpSubtitle: "NEAR でパスキーを解決しています…",
  signingInTitle: "サインインしています",
  signingInFinalizeSubtitle: "NEAR でアカウントを確定しています…",
  signingInSetupSubtitle: "NEAR でアカウントを設定しています…",
  usePasskeyTitle: "パスキーを使用",
  usePasskeySubtitle: "パスキーを選んでデバイスで確認してください",

  errOrphan:
    "このウォレットが使用できないパスキーがデバイスで作成されました。デバイスのパスワード／パスキー設定を開き、このサイト用に作成したばかりのパスキーを削除してから、別のデバイスで再試行してください。",
  errNonResident:
    "後で復元できないパスキーがデバイスで作成されました（レジデントキーではありません）。別のデバイスを試すか、スマートフォンでパスキーを作成してください。",
  errNotVerified:
    "本人確認なしでデバイスがサインインしました。Face ID、指紋、画面ロック、またはセキュリティキーの PIN を設定してから再試行してください。",
  errWrongPasskey:
    "このアカウントとは別のパスキーでした。もう一度試して、このアカウントのパスキーを選んでください。",
  errNotRegistered:
    "このパスキーはパスキーレジストリに登録されていません（または登録済みの鍵が署名と一致しません）。元のデバイスで作成し直すか、先に登録してください。",
  errRegistrationCancelled: "パスキーの登録がキャンセルされました: {message}",
  errNotSignedIn: "ウォレットにサインインしていません",

  waCancelledCreate:
    "パスキーの作成がキャンセルされたか、タイムアウトしました。もう一度試して、求められたらデバイスで確認してください。",
  waCancelledGet:
    "サインインがキャンセルされたか、タイムアウトしました。もう一度試して、求められたらデバイスで確認してください。",
  waDuplicate: "このデバイスにはすでにアカウントがあります。「サインイン」を選んで使用してください。",
  waNotSupportedCreate:
    "このデバイスはこのウォレットに必要な種類のパスキーを作成できません。別のデバイスを試すか、スマートフォンでサインイン用 QR コードをスキャンしてください。",
  waNotSupportedGet:
    "このデバイスはパスキーでサインインできません。作成したデバイスを試すか、スマートフォンで QR コードをスキャンしてください。",
  waConstraintCreate:
    "このパスキーを作成するには、デバイスまたはセキュリティキーに PIN、指紋、または顔認証の設定が必要です。デバイス設定で追加して再試行してください。",
  waConstraintGet:
    "サインインするにはセキュリティキーに PIN、またはデバイスに画面ロックが必要です。設定して再試行してください。",
  waSecurity:
    "現在このサイトはパスキーを使用できません。正しいウェブサイトであること、安全な接続（https）で読み込まれていることを確認してください。",
  waGenericCreate:
    "パスキーの作成中に問題が発生しました。もう一度試して、デバイスの画面ロック（Face ID、指紋、または PIN）が設定されていることを確認してください。",
  waGenericGet:
    "パスキーでのサインイン中に問題が発生しました。作成したデバイスで再試行してください。",
};

const ko: Catalog = {
  appTitle: "NEAR",
  appTagline: "비밀번호도, 시드 문구도 없이 — 당신의 기기만으로.",
  signUp: "가입",
  signIn: "로그인",

  addAccountTitle: "다른 계정 추가",
  addAccountSubtitle: "계정을 구분할 사용자 이름 또는 이메일을 입력하세요",
  usernameOrEmailPlaceholder: "사용자 이름 또는 이메일",
  continue: "계속",

  registrationFailedTitle: "등록 실패",
  registrationNotRegisteredWarning:
    "패스키가 생성되었지만 아직 등록되지 않았습니다. 등록하지 않으면 다른 기기에서 복구할 수 없습니다.",
  retry: "다시 시도",
  cancel: "취소",
  close: "닫기",
  passkeyNotRegisteredTitle: "패스키가 등록되지 않음",

  createPasskeyTitle: "패스키 만들기",
  createPasskeySubtitle: "요청 시 기기에서 확인하세요",
  registeringTitle: "패스키를 등록하는 중",
  registeringSubtitle: "공개 키를 NEAR에 게시하는 중…",
  approveTxTitle: "거래 승인",
  approveTxSubtitle: "승인하려면 기기에서 확인하세요.",
  approveBtn: "승인",
  signMsgTitle: "서명 확인",
  signMsgSubtitle: "이 메시지에 서명하려면 기기에서 확인하세요.",
  signBtn: "서명",
  confirmSignInTitle: "로그인 확인",
  confirmSignInSubtitle: "로그인하려면 기기에서 확인하세요.",
  confirmSignInBtn: "로그인",
  confirmSignInAgainSubtitle: "기기에서 한 번 더 확인하세요.",
  lookingUpTitle: "계정을 찾는 중",
  lookingUpSubtitle: "NEAR에서 패스키를 확인하는 중…",
  signingInTitle: "로그인하는 중",
  signingInFinalizeSubtitle: "NEAR에서 계정을 마무리하는 중…",
  signingInSetupSubtitle: "NEAR에서 계정을 설정하는 중…",
  usePasskeyTitle: "패스키 사용",
  usePasskeySubtitle: "패스키를 선택하고 기기에서 확인하세요",

  errOrphan:
    "이 지갑이 사용할 수 없는 패스키가 기기에서 생성되었습니다. 기기의 비밀번호/패스키 설정을 열고 방금 이 사이트에 대해 만든 패스키를 삭제한 다음 다른 기기에서 다시 시도하세요.",
  errNonResident:
    "나중에 복구할 수 없는 패스키가 기기에서 생성되었습니다(레지던트 키가 아님). 다른 기기를 사용하거나 휴대폰으로 패스키를 만드세요.",
  errNotVerified:
    "기기가 본인 확인 없이 로그인했습니다. Face ID, 지문, 화면 잠금 또는 보안 키 PIN을 설정한 다음 다시 시도하세요.",
  errWrongPasskey:
    "이 계정과 다른 패스키였습니다. 다시 시도하고 이 계정의 패스키를 선택하세요.",
  errNotRegistered:
    "이 패스키는 패스키 레지스트리에 등록되어 있지 않습니다(또는 등록된 키가 서명과 일치하지 않습니다). 원래 기기에서 다시 만들거나 먼저 등록하세요.",
  errRegistrationCancelled: "패스키 등록이 취소되었습니다: {message}",
  errNotSignedIn: "지갑에 로그인하지 않음",

  waCancelledCreate:
    "패스키 생성이 취소되었거나 시간이 초과되었습니다. 다시 시도하고 요청 시 기기에서 확인하세요.",
  waCancelledGet:
    "로그인이 취소되었거나 시간이 초과되었습니다. 다시 시도하고 요청 시 기기에서 확인하세요.",
  waDuplicate: "이 기기에 이미 계정이 있습니다. 사용하려면 「로그인」을 선택하세요.",
  waNotSupportedCreate:
    "이 기기는 이 지갑에 필요한 유형의 패스키를 만들 수 없습니다. 다른 기기를 사용하거나 휴대폰으로 로그인 QR 코드를 스캔하세요.",
  waNotSupportedGet:
    "이 기기는 패스키로 로그인할 수 없습니다. 패스키를 만든 기기를 사용하거나 휴대폰으로 QR 코드를 스캔하세요.",
  waConstraintCreate:
    "이 패스키를 만들려면 기기 또는 보안 키에 PIN, 지문 또는 얼굴 잠금 해제가 설정되어 있어야 합니다. 기기 설정에서 추가한 다음 다시 시도하세요.",
  waConstraintGet:
    "로그인하려면 보안 키에 PIN이, 기기에 화면 잠금이 필요합니다. 설정한 다음 다시 시도하세요.",
  waSecurity:
    "이 사이트는 현재 패스키를 사용할 수 없습니다. 올바른 웹사이트에 있고 보안 연결(https)로 로드되었는지 확인하세요.",
  waGenericCreate:
    "패스키를 만드는 중 문제가 발생했습니다. 다시 시도하고 기기의 화면 잠금(Face ID, 지문 또는 PIN)이 설정되어 있는지 확인하세요.",
  waGenericGet:
    "패스키로 로그인하는 중 문제가 발생했습니다. 패스키를 만든 기기에서 다시 시도하세요.",
};

const CATALOGS: Record<Lang, Catalog> = {
  en,
  zh,
  hi,
  es,
  fr,
  ar,
  fa,
  ru,
  uk,
  pt,
  de,
  it,
  pl,
  nl,
  tr,
  id,
  vi,
  ja,
  ko,
};

/** Keys any locale is missing relative to English (empty when complete). */
export function missingKeysByLang(): Record<Lang, string[]> {
  const enKeys = Object.keys(en);
  const out = {} as Record<Lang, string[]>;
  for (const l of SUPPORTED_LANGS) {
    out[l] = enKeys.filter((k) => !(k in CATALOGS[l]));
  }
  return out;
}

/**
 * Map an UNsupported base language subtag to the closest supported language.
 * A user whose locale we don't ship is far better served by a related language
 * they likely read than by English — e.g. a Belarusian (`be`) user almost
 * certainly reads Russian, a Malay (`ms`) user reads Indonesian.
 *
 * Only unsupported bases belong here; a directly-supported base is used as-is.
 */
const LANG_FALLBACKS: Readonly<Record<string, Lang>> = {
  // Post-Soviet / Central Asia → Russian (widespread lingua franca)
  be: "ru", // Belarusian
  kk: "ru", // Kazakh
  ky: "ru", // Kyrgyz
  uz: "ru", // Uzbek
  tk: "ru", // Turkmen
  hy: "ru", // Armenian
  mo: "ru", // Moldovan (legacy code)
  // Turkic close to Turkish
  az: "tr", // Azerbaijani
  // Iberian / regional → Spanish
  ca: "es", // Catalan
  gl: "es", // Galician
  eu: "es", // Basque
  oc: "es", // Occitan
  // West-Germanic → Dutch
  af: "nl", // Afrikaans
  // Malay ↔ Indonesian (mutually intelligible)
  ms: "id",
  // Persian varieties → Persian
  ps: "fa", // Pashto
  prs: "fa", // Dari
  // Devanagari / Indo-Aryan neighbours → Hindi
  ne: "hi", // Nepali
  mr: "hi", // Marathi
  gu: "hi", // Gujarati
  pa: "hi", // Punjabi
  sa: "hi", // Sanskrit
  // Arabic-script / Gulf neighbours already covered by `ar` directly
};

function resolveLang(base: string): Lang | null {
  if ((SUPPORTED_LANGS as readonly string[]).includes(base)) return base as Lang;
  return LANG_FALLBACKS[base] ?? null;
}

function detectLang(): Lang {
  // `navigator` is absent under the node test environment — default to English.
  if (typeof navigator === "undefined") return "en";
  const nav = navigator as Navigator & { languages?: readonly string[] };
  const candidates =
    nav.languages && nav.languages.length > 0 ? nav.languages : [nav.language || "en"];
  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split("-")[0] ?? "";
    const resolved = resolveLang(base);
    if (resolved) return resolved;
  }
  return "en";
}

let current: Lang | null = null;

/** The active language, detected once from `navigator` on first use. */
export function lang(): Lang {
  if (current === null) current = detectLang();
  return current;
}

/** Override the active language (e.g. from a dApp-provided locale). */
export function setLang(next: Lang): void {
  current = next;
}

/** Whether the active (or given) language is right-to-left. */
export function isRtl(l: Lang = lang()): boolean {
  return RTL_LANGS.has(l);
}

/** `"rtl"` | `"ltr"` for the active (or given) language — set on the dialog. */
export function dir(l: Lang = lang()): "rtl" | "ltr" {
  return isRtl(l) ? "rtl" : "ltr";
}

/**
 * Translate `key` into the active language, filling `{name}` placeholders from
 * `params`. Falls back to English, then to the raw key, so nothing renders
 * empty.
 */
export function t(key: string, params?: Params): string {
  const table = CATALOGS[lang()];
  let text = table[key] ?? en[key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
