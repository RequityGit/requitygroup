'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/borrowers', label: 'Borrowers', icon: '👤' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--navy-deep)' }}>
      <style>{`
        .admin-sidebar {
          width: 240px;
          background: var(--navy);
          border-right: 1px solid rgba(255,255,255,0.06);
          padding: 24px 0;
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 50;
          display: flex;
          flex-direction: column;
        }
        .admin-sidebar-logo {
          padding: 0 24px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 16px;
        }
        .admin-sidebar-logo a {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          text-decoration: none;
        }
        .admin-sidebar-logo span {
          font-size: 11px;
          font-weight: 500;
          color: var(--champagne);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-top: 4px;
          font-family: var(--font-body);
        }
        .admin-nav { list-style: none; padding: 0 12px; flex: 1; }
        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
          margin-bottom: 4px;
        }
        .admin-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.8);
        }
        .admin-nav-item.active {
          background: rgba(198,169,98,0.1);
          color: var(--champagne);
        }
        .admin-main {
          margin-left: 240px;
          flex: 1;
          min-height: 100vh;
          background: var(--navy-deep);
        }
        .admin-content {
          padding: 32px 40px;
          max-width: 1400px;
        }
        @media (max-width: 768px) {
          .admin-sidebar { width: 200px; }
          .admin-main { margin-left: 200px; }
          .admin-content { padding: 24px; }
        }
      `}</style>

      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <Link href="/admin/borrowers">Requity</Link>
          <span>Admin Portal</span>
        </div>
        <ul className="admin-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`admin-nav-item ${pathname.startsWith(item.href) ? 'active' : ''}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
