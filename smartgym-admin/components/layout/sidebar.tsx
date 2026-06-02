"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Users, DollarSign, ShieldCheck,
  Dumbbell, Calendar, Settings, LogOut, Bell, ChevronDown, Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/alunos", label: "Alunos", icon: Users, badge: "248" },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
  { href: "/acesso", label: "Controle de Acesso", icon: ShieldCheck, badge: "AO VIVO" },
  { href: "/treinos", label: "Treinos", icon: Dumbbell },
  { href: "/agendamentos", label: "Agendamentos", icon: Calendar },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="p-2 bg-indigo-600 rounded-xl">
          <Dumbbell className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-tight">SmartGym</div>
          <div className="text-indigo-400 text-xs">Control</div>
        </div>
      </div>

      {/* Unit selector */}
      <div className="px-4 py-3 border-b border-gray-800">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-left">
          <Building2 className="h-4 w-4 text-gray-400" />
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-medium truncate">Academia Central</div>
            <div className="text-gray-500 text-xs">Unidade Paulista</div>
          </div>
          <ChevronDown className="h-3 w-3 text-gray-400 flex-shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Menu Principal</p>
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <Badge
                  className={cn(
                    "text-xs px-1.5 py-0 h-5",
                    badge === "AO VIVO"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse"
                      : active
                        ? "bg-white/20 text-white border-0"
                        : "bg-gray-700 text-gray-300 border-0"
                  )}
                  variant="outline"
                >
                  {badge}
                </Badge>
              )}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">Sistema</p>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <Bell className="h-4 w-4" />
            <span>Notificações</span>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs px-1.5 py-0 h-5 ml-auto" variant="outline">3</Badge>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          >
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </Link>
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-indigo-600 text-white text-xs font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Admin Geral</div>
            <div className="text-gray-500 text-xs truncate">admin@smartgym.app</div>
          </div>
          <Link href="/login">
            <LogOut className="h-4 w-4 text-gray-500 hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
