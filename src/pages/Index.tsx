import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  {
    id: 1,
    name: "CARGO-01",
    subtitle: "Тактическая сумка",
    price: 18900,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/a367f9ef-deaa-4fd3-95aa-6bb2dc349d35.jpg",
    material: "Баллистический нейлон · Сталь 304",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "FRAME-02",
    subtitle: "Кросс-боди",
    price: 14500,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/1b189f3d-31c8-4d18-82e1-1f65bf3148b1.jpg",
    material: "Кордура 1000D · Алюминий",
    tag: "NEW",
  },
  {
    id: 3,
    name: "SLAB-03",
    subtitle: "Шоппер",
    price: 22400,
    image: "https://cdn.poehali.dev/projects/247b83a8-9273-4551-9e66-5ea22b35b356/files/8ea194ea-7810-4e66-ba7b-d232da291171.jpg",
    material: "Технический брезент · Латунь",
    tag: null,
  },
];

type CartItem = { id: number; name: string; price: number; qty: number };
type Step = "catalog" | "cart" | "checkout" | "success";

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<Step>("catalog");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setCart([]);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--nc-charcoal)", color: "var(--nc-light)", fontFamily: "IBM Plex Sans, sans-serif" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: "1px solid var(--nc-iron)", background: "rgba(15,15,15,0.92)", backdropFilter: "blur(12px)" }}
      >
        <button
          onClick={() => { setStep("catalog"); setMenuOpen(false); }}
          style={{ color: "var(--nc-white)", letterSpacing: "0.3em", fontFamily: "Cormorant, serif", fontSize: "1.1rem", fontWeight: 300 }}
        >
          NOVACLOU
        </button>

        <div className="hidden md:flex items-center gap-10">
          {["Коллекция", "О бренде", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs tracking-widest uppercase transition-colors duration-300"
              style={{ color: "var(--nc-chrome)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-chrome)")}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setStep(step === "cart" ? "catalog" : "cart")}
            className="relative flex items-center gap-2 text-xs tracking-widest uppercase transition-colors duration-300"
            style={{ color: "var(--nc-chrome)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-chrome)")}
          >
            <Icon name="ShoppingBag" size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-[10px] font-medium"
                style={{ background: "var(--nc-accent)", color: "var(--nc-charcoal)", borderRadius: "50%" }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--nc-chrome)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "var(--nc-charcoal)" }}>
          {["Коллекция", "О бренде", "Контакты"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-3xl font-light tracking-widest"
              style={{ color: "var(--nc-light)", fontFamily: "Cormorant, serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* ===================== CATALOG ===================== */}
      {step === "catalog" && (
        <>
          {/* HERO */}
          <section
            className="relative min-h-screen flex flex-col justify-end px-6 md:px-16 pb-20 pt-32"
            style={{ background: "linear-gradient(160deg, var(--nc-charcoal) 0%, #111 40%, #1a1612 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 60px, var(--nc-iron) 60px, var(--nc-iron) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, var(--nc-iron) 60px, var(--nc-iron) 61px)",
              }}
            />
            <div className="relative z-10 max-w-4xl">
              <p
                className="text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in"
                style={{ color: "var(--nc-chrome)", animationDelay: "0.2s", opacity: 0 }}
              >
                Промышленные материалы · Честная конструкция
              </p>
              <h1
                className="font-light leading-none mb-8 animate-fade-up"
                style={{
                  fontFamily: "Cormorant, serif",
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  color: "var(--nc-white)",
                  animationDelay: "0.4s",
                  opacity: 0,
                }}
              >
                Сделано
                <br />
                <em style={{ color: "var(--nc-accent)" }}>без лишнего.</em>
              </h1>
              <p
                className="max-w-md text-sm leading-relaxed mb-12 animate-fade-up"
                style={{ color: "var(--nc-chrome)", animationDelay: "0.6s", opacity: 0 }}
              >
                Каждая вещь NOVACLOU — это функция в форме. Баллистический нейлон,
                кованая сталь, латунь. Без декора. Без компромиссов.
              </p>
              <button
                onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300 animate-fade-up"
                style={{ border: "1px solid var(--nc-accent)", color: "var(--nc-accent)", animationDelay: "0.8s", opacity: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--nc-accent)"; e.currentTarget.style.color = "var(--nc-charcoal)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--nc-accent)"; }}
              >
                Смотреть коллекцию
                <Icon name="ArrowDown" size={14} />
              </button>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
              <div className="w-px h-16" style={{ background: "var(--nc-iron)" }} />
              <span className="text-[10px] tracking-[0.4em] uppercase" style={{ writingMode: "vertical-rl", color: "var(--nc-chrome)" }}>
                SS 2026
              </span>
              <div className="w-px h-16" style={{ background: "var(--nc-iron)" }} />
            </div>
          </section>

          {/* COLLECTION */}
          <section id="collection" className="px-6 md:px-16 py-24">
            <div className="flex items-baseline justify-between mb-16">
              <h2 className="font-light" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--nc-white)" }}>
                Коллекция
              </h2>
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>3 изделия</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--nc-iron)" }}>
              {PRODUCTS.map((product, idx) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} idx={idx} />
              ))}
            </div>
          </section>

          {/* MANIFESTO */}
          <section className="px-6 md:px-16 py-24" style={{ borderTop: "1px solid var(--nc-iron)", borderBottom: "1px solid var(--nc-iron)" }}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-light leading-relaxed" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--nc-accent)" }}>
                "Мы не украшаем. Мы строим."
              </p>
              <p className="mt-6 text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>— NOVACLOU, 2026</p>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-6 md:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <span className="text-lg tracking-widest" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-chrome)" }}>NOVACLOU</span>
            <p className="text-xs tracking-wider" style={{ color: "var(--nc-chrome)" }}>© 2026 · Все изделия ручной сборки</p>
          </footer>
        </>
      )}

      {/* ===================== CART ===================== */}
      {step === "cart" && (
        <div className="min-h-screen pt-32 px-6 md:px-16 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-light" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--nc-white)" }}>
                Корзина
              </h2>
              <button onClick={() => setStep("catalog")} className="flex items-center gap-2 text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>
                <Icon name="ArrowLeft" size={14} />
                Назад
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl font-light mb-6" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-chrome)" }}>Корзина пуста</p>
                <button
                  onClick={() => setStep("catalog")}
                  className="text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300"
                  style={{ border: "1px solid var(--nc-iron)", color: "var(--nc-light)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-iron)")}
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-px" style={{ background: "var(--nc-iron)" }}>
                  {cart.map((item) => {
                    const product = PRODUCTS.find((p) => p.id === item.id)!;
                    return (
                      <div key={item.id} className="flex items-center gap-6 p-6" style={{ background: "var(--nc-charcoal)" }}>
                        <img src={product.image} alt={item.name} className="w-20 h-20 object-cover" style={{ filter: "grayscale(20%)" }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xl font-light" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-white)" }}>{item.name}</p>
                          <p className="text-xs tracking-wider mt-1" style={{ color: "var(--nc-chrome)" }}>{product.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center text-xs transition-colors"
                            style={{ border: "1px solid var(--nc-iron)", color: "var(--nc-chrome)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-chrome)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-iron)")}
                          >−</button>
                          <span className="w-6 text-center text-sm" style={{ color: "var(--nc-light)" }}>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center text-xs transition-colors"
                            style={{ border: "1px solid var(--nc-iron)", color: "var(--nc-chrome)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-chrome)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-iron)")}
                          >+</button>
                        </div>
                        <div className="text-right min-w-24">
                          <p className="text-sm font-medium" style={{ color: "var(--nc-white)" }}>{(item.price * item.qty).toLocaleString("ru-RU")} ₽</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] tracking-widest uppercase mt-1 transition-colors"
                            style={{ color: "var(--nc-iron)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--nc-chrome)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--nc-iron)")}
                          >Удалить</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-px p-6 flex items-center justify-between" style={{ background: "var(--nc-steel)" }}>
                  <div>
                    <p className="text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>Итого</p>
                    <p className="text-3xl font-light mt-1" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-white)" }}>
                      {total.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>
                  <button
                    onClick={() => setStep("checkout")}
                    className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
                    style={{ background: "var(--nc-accent)", color: "var(--nc-charcoal)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Оформить заказ
                    <Icon name="ArrowRight" size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===================== CHECKOUT ===================== */}
      {step === "checkout" && (
        <div className="min-h-screen pt-32 px-6 md:px-16 pb-20">
          <div className="max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <h2 className="font-light" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--nc-white)" }}>
                Оформление
              </h2>
              <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>
                <Icon name="ArrowLeft" size={14} />
                Корзина
              </button>
            </div>

            <form onSubmit={handleOrder} className="flex flex-col gap-px" style={{ background: "var(--nc-iron)" }}>
              {[
                { key: "name", label: "Имя и фамилия", type: "text", placeholder: "Иван Иванов" },
                { key: "phone", label: "Телефон", type: "tel", placeholder: "+7 (___) ___-__-__" },
                { key: "address", label: "Адрес доставки", type: "text", placeholder: "Город, улица, дом, квартира" },
              ].map((field) => (
                <div key={field.key} style={{ background: "var(--nc-charcoal)" }} className="p-6">
                  <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--nc-chrome)" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full bg-transparent text-sm outline-none pb-2 transition-colors"
                    style={{ color: "var(--nc-light)", borderBottom: "1px solid var(--nc-iron)", fontFamily: "IBM Plex Sans, sans-serif" }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-iron)")}
                  />
                </div>
              ))}

              <div style={{ background: "var(--nc-charcoal)" }} className="p-6">
                <label className="block text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: "var(--nc-chrome)" }}>
                  Комментарий
                </label>
                <textarea
                  rows={3}
                  placeholder="Пожелания к заказу..."
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none resize-none pb-2 transition-colors"
                  style={{ color: "var(--nc-light)", borderBottom: "1px solid var(--nc-iron)", fontFamily: "IBM Plex Sans, sans-serif" }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--nc-iron)")}
                />
              </div>

              <div className="p-6 flex items-center justify-between" style={{ background: "var(--nc-steel)" }}>
                <div>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "var(--nc-chrome)" }}>К оплате</p>
                  <p className="text-2xl font-light mt-1" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-white)" }}>
                    {total.toLocaleString("ru-RU")} ₽
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
                  style={{ background: "var(--nc-accent)", color: "var(--nc-charcoal)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Подтвердить
                  <Icon name="Check" size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SUCCESS ===================== */}
      {step === "success" && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-8" style={{ border: "1px solid var(--nc-accent)" }}>
            <Icon name="Check" size={24} style={{ color: "var(--nc-accent)" }} />
          </div>
          <h2 className="font-light mb-4" style={{ fontFamily: "Cormorant, serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--nc-white)" }}>
            Заказ принят
          </h2>
          <p className="max-w-sm text-sm leading-relaxed mb-12" style={{ color: "var(--nc-chrome)" }}>
            Мы свяжемся с вами в течение 24 часов для подтверждения и уточнения деталей доставки.
          </p>
          <button
            onClick={() => setStep("catalog")}
            className="text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300"
            style={{ border: "1px solid var(--nc-iron)", color: "var(--nc-light)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--nc-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--nc-iron)")}
          >
            Вернуться в каталог
          </button>
        </div>
      )}

    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  idx,
}: {
  product: (typeof PRODUCTS)[0];
  onAdd: (p: (typeof PRODUCTS)[0]) => void;
  idx: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ background: "var(--nc-charcoal)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.3em] uppercase px-2 py-1" style={{ background: "var(--nc-accent)", color: "var(--nc-charcoal)" }}>
          {product.tag}
        </div>
      )}

      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", filter: "grayscale(15%) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: "linear-gradient(to top, rgba(15,15,15,0.8) 0%, transparent 50%)", opacity: hovered ? 1 : 0.3 }}
        />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-light" style={{ fontFamily: "Cormorant, serif", color: "var(--nc-white)" }}>{product.name}</h3>
            <span className="text-sm font-light" style={{ color: "var(--nc-light)" }}>{product.price.toLocaleString("ru-RU")} ₽</span>
          </div>
          <p className="text-xs tracking-wider mt-1" style={{ color: "var(--nc-chrome)" }}>{product.subtitle}</p>
          <p className="text-[10px] tracking-wider mt-2 uppercase" style={{ color: "var(--nc-iron)", letterSpacing: "0.1em" }}>{product.material}</p>
        </div>

        <button
          onClick={() => onAdd(product)}
          className="w-full py-3 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            border: `1px solid ${hovered ? "var(--nc-accent)" : "var(--nc-iron)"}`,
            color: hovered ? "var(--nc-charcoal)" : "var(--nc-light)",
            background: hovered ? "var(--nc-accent)" : "transparent",
          }}
        >
          <Icon name="Plus" size={12} />
          В корзину
        </button>
      </div>
    </div>
  );
}
