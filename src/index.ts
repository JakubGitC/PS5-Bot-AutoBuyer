configure({
  appenders: { out: { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } },
});

// 5 minutes
const TIMEOUT = 5 * 60 * 1000;

const sites: SiteDef[] = [
  new MediaMarktDef(),
  new MediaExpertDef(),
  new NeonetDef(),
  new EuroDef(),
  new EmpikDef(),
  new AvansDef(),
  new KomputronikDef(),
  new XKomDef(),
  new MoreleNetDef(),
];
function sleep(timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer));
}