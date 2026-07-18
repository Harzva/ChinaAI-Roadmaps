export const PRIVATE_DENYLIST = [
  /(?:^|_)(?:token|secret|password|cookie|authorization|credential)(?:$|_)/i,
  /(?:^|_)(?:developer|internal|private|debug|crawler|parser|raw|stacktrace)(?:$|_)/i,
  /(?:^|_)(?:note|comment|memo)(?:$|_)/i,
  /\/Users\//,
  /\/Volumes\//,
  /BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/
];

export const PUBLIC_RESULT_FIELDS = new Set(['resultId','rank','system','model','score','uncertainty','evaluationDate','source','comparability','runConfig','notes']);
