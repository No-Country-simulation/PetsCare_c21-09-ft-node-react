import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Mascota {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long idPet;
    private String name;
    private String species;
    private String breed;
    private int age;

    // Relación con la entidad Usuario
    @ManyToOne
    @JoinColumn(name = "usuario_id") // Clave foránea en la tabla Mascota
    private Usuario usuario;
}
