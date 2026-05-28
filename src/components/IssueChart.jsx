import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { computeStats } from '../utils/issueHelpers'

const ESTADO_COLORS = ['#fbbf24', '#06b6d4', '#34d399']
const PRIORIDAD_COLORS = ['#34d399', '#fbbf24', '#f43f5e']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg px-3 py-2">
        <p className="text-xs font-mono text-[#e6edf3]">
          {payload[0].name}: <span style={{ color: payload[0].payload.fill || payload[0].fill }}>{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default function IssueChart({ issues }) {
  const stats = computeStats(issues)

  const estadoData = [
    { name: 'Pendiente', value: stats.pendiente, fill: '#fbbf24' },
    { name: 'En Progreso', value: stats.enProgreso, fill: '#06b6d4' },
    { name: 'Resuelto', value: stats.resuelto, fill: '#34d399' },
  ]

  const prioridadData = [
    { name: 'Baja', value: issues.filter((i) => i.prioridad === 'Baja').length, fill: '#34d399' },
    { name: 'Media', value: issues.filter((i) => i.prioridad === 'Media').length, fill: '#fbbf24' },
    { name: 'Alta', value: issues.filter((i) => i.prioridad === 'Alta').length, fill: '#f43f5e' },
  ]

  if (issues.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Donut — Estados */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
        <div className="mb-4">
          <p className="text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-0.5">Distribución</p>
          <h3 className="text-sm font-semibold text-white">Por Estado</h3>
        </div>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={estadoData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {estadoData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 shrink-0">
            {estadoData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.fill }} />
                <span className="text-xs text-[#8b949e] font-mono whitespace-nowrap">{item.name}</span>
                <span className="text-xs font-bold ml-1" style={{ color: item.fill }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar — Prioridades */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
        <div className="mb-4">
          <p className="text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-0.5">Distribución</p>
          <h3 className="text-sm font-semibold text-white">Por Prioridad</h3>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={prioridadData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#8b949e', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#8b949e', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {prioridadData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}